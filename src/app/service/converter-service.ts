import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConverterService {
  constructor() {}

  convertToDSL(workflowData: any) {
    let data = workflowData.workflow;
    var states: any = [];
    this.switcher(data.root, states);
    let functions: any = [];
    let events: any = [];
    states.forEach((el: any) => {
      if (el.type == 'event') {
        events.push({
          name: el.onEvents[0].eventRefs[0],
          type: 'com.fasterxml.jackson.databind.JsonNode',
          source: 'applicationsSource',
        });
      }

      if (el.actions && el.actions.length > 0 && el.actions[0].functionRef) {
        if (!functions.find((f: any) => f.name == el.actions[0].functionRef)) {
          functions.push({
            name: el.actions[0].functionRef,
            type: 'rest',
          });
        }
      }
    });
    
    let response: any = {
      ...workflowData.settings,
      states: states,
      functions: functions,
      events: events,
    };
    response.version = response.id + "-"  + response.version;
    return response;
  }

  private travelToChild(data: any, dt: any) {
    debugger;
    console.log(data.type, data.id);
    if (data.children && data.children.length > 0) {
      for (let i = 0; i < data.children.length; i++) {
        const element = data.children[i];
        this.switcher(element, dt);
      }
    }
  }

  private switcher(element: any, dt: any) {
    switch (element.type) {
      case 'router':
        this.traveltoRouter(element, dt);
        break;
      case 'sleep':
        dt.push({
          type: 'sleep',
          duration: element.data.sleep,
          name: element.id,
          metadata: { name: element.data.name },
          transition: element.children[0].id,
        });
        this.travelToChild(element, dt);
        break;
      case 'input':
        let eventData: any = [
          {
            eventRefs: [element.data.evt_name],
            actions: [],
          },
        ];
        dt.push({
          type: 'event',
          onEvents: eventData,
          name: element.id,
          metadata: { name: element.data.name },
          transition: element.children[0].id,
        });
        this.travelToChild(element, dt);
        break;
      case 'execute':
      case 'callback':
        dt.push({
          type: 'operation',
          actions: [
            {
              name: element.data.name,
              functionRef: element.data.action,
            },
          ],
          name: element.id,
          metadata: { name: element.data.name },
          transition: element.children[0].id,
        });
        this.travelToChild(element, dt);
        break;
      case 'end':
        delete dt[dt.length - 1]['transition'];
        dt[dt.length - 1].end = true;
        break;
      default:
        // this.travelToChild(element, dt);
        break;
    }
  }

  private traveltoRouter(data: any, dt: any) {
    var conditions: any = [];
    for (let k = 0; k < data.children.length; k++) {
      const el = data.children[k];
      conditions.push({
        condition: el.data.mvel,
        transition: el.children[0].id,
      });
    }

    dt.push({
      type: 'switch',
      dataConditions: conditions,
      name: data.id,
      metadata: { name: data.data.name },
    });
    for (let k = 0; k < data.children.length; k++) {
      const el = data.children[k];
      this.travelToChild(el, dt);
    }
  }
}
