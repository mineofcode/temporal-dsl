import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  NgFlowchart,
  NgFlowchartCanvasDirective,
  NgFlowchartStepRegistry,
} from '@joelwenzel/ng-flowchart';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { NodeCommunicateService } from './service/communicate-service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { NormalStepComponent } from './custom-step/normal-step/normal-step.component';
import { ConverterService } from './service/converter-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'workspace';

  callbacks: NgFlowchart.Callbacks = {};
  options: NgFlowchart.Options = {
    stepGap: 40,
    rootPosition: 'FREE',
    zoom: {
      mode: 'DISABLED',
    },
  };
  
  workflowOptions: any = {
    id: 'customerapplication',
    name: 'Customer Application Workflow',
    version: '1.1',
    timeouts: {
      workflowExecTimeout: {
        duration: 'PT10M',
      },
      actionExecTimeout: 'PT10S',
    },
    retries: [
      {
        name: 'WorkflowRetries',
        delay: 'PT3S',
        maxAttempts: 10,
      },
    ],
  };
  defaultWorkFlowOptions =  JSON.stringify(this.workflowOptions);
  propertyPanelVisible = false;

  placement: NzDrawerPlacement = 'right';
  openProperyPanel(): void {
    this.propertyPanelVisible = true;
  }

  closeProperyPanel(): void {
    this.propertyPanelVisible = false;
    this.nodeCommService.deselectNode();
  }

  settingsPlacement: NzDrawerPlacement = 'right';
  settingsPanelVisible = false;
  openSetingsPanel(): void {
    this.settingsPanelVisible = true;
  }

  closeSettingsPanel(): void {
    this.settingsPanelVisible = false;
  }

  drawerData: any = {};

  @ViewChild(NgFlowchartCanvasDirective)
  canvas: NgFlowchartCanvasDirective | any;

  disabled = false;
  listOfOption: Array<{ label: string; value: string }> = [];

  items = [];

  customOps = [{
    name: 'Activity',
    type: 'execute',
    template: NormalStepComponent,
    data: {
      name: 'Activity Name',
      icon: 'code',
      iconColor: 'rgb(255 0 0)',
      description: 'Execute the activity',
      has: {
        mvel: false,
        actions: true,
      },
    },
  },
  {
    name: 'Input',
    type: 'input',
    template: NormalStepComponent,
    data: {
      name: 'Input Signal',
      icon: 'edit',
      iconColor: 'rgb(1 159 144)',
      description: 'Waiting for input',
      has: {
        mvel: true,
        evt_name: true,
      },
    },
  },
    {
      name: 'Routing Block',
      template: CustomStepComponent,
      type: 'router',
      data: {
        name: 'Routing Block',
        icon: 'cluster',
        iconColor: 'rgb(255 141 0)',
        description: 'Condition to route group',
        has: {},
        subdata: {
          name: 'Route',
          icon: 'branches',
          // iconColor: 'rgb(14 10 0)',
          description: 'Condition',
          has: {
            mvel: true,
          },
        },
      },
    },
    {
      name: 'Sleep',
      type: 'sleep',
      template: NormalStepComponent,
      data: {
        name: 'Sleep',
        icon: 'clock-circle',
        iconColor: 'rgb(0 63 204)',
        description: 'Sleep the workflow',
        sleep: 'PT2S',
        has: {
          mvel: false,
          sleepinput: true,
        },
      },
    },
    

    {
      name: 'Callback',
      type: 'callback',
      template: NormalStepComponent,
      data: {
        name: 'Callback',
        icon: 'cloud-upload',
        iconColor: 'rgb(204, 0, 0)',
        description: 'Send callback',
        has: {
          mvel: false,
        },
      },
    },
    {
      name: 'Complete',
      type: 'end',
      template: NormalStepComponent,
      data: {
        name: 'Complete',
        icon: 'check-circle',
        iconColor: 'rgb(0 204 53)',
        description: 'Complete the workflow',
        has: {
          mvel: false,
        },
      },
    },
  ];
  colors: any = [];

  constructor(
    private stepRegistry: NgFlowchartStepRegistry,
    private nodeCommService: NodeCommunicateService,
    private modal: NzModalService,
    private convt: ConverterService
  ) {
    this.callbacks.onDropError = this.onDropError;
    this.callbacks.onMoveError = this.onMoveError;
    this.callbacks.afterDeleteStep = this.afterDeleteStep;
    this.callbacks.beforeDeleteStep = this.beforeDeleteStep;
    this.callbacks.onDropStep = this.onDrop;
    nodeCommService.events.subscribe((d) => {
      if (d?.data?.name) {
        console.log(d);
        let object = this.customOps.find((a) => a.type === d.type);

        if (object) {
          if (!d.data.has) d.data.has = {};
          Object.assign(d.data.has, object.data.has);
        }
        this.drawerData = d.data;
        this.openProperyPanel();
      } else {
        this.closeProperyPanel();
      }
    });

    // this.listOfOption.push({ label: 'CRM INSERT/UPDATE', value: 'crmgreen' });

    // this.listOfOption.push({ label: 'MBC Bureau & BRE', value: 'mbc' });

    // this.listOfOption.push({ label: 'Hunter', value: 'hunter' });
    this.listOfOption.push({
      label: 'CheckCustomerInfo',
      value: 'CheckCustomerInfo',
    });
    this.listOfOption.push({
      label: 'UpdateApplicationInfo',
      value: 'UpdateApplicationInfo',
    });
    this.listOfOption.push({
      label: 'RejectApplication',
      value: 'RejectApplication',
    });
    this.listOfOption.push({
      label: 'ApproveApplication',
      value: 'ApproveApplication',
    });
  }

  ngAfterViewInit() {
    this.stepRegistry.registerStep('route-step', RouteStepComponent);
    this.stepRegistry.registerStep('router', CustomStepComponent);
    this.stepRegistry.registerStep('execute', NormalStepComponent);
    this.stepRegistry.registerStep('input', NormalStepComponent);
    this.stepRegistry.registerStep('sleep', NormalStepComponent);
    this.stepRegistry.registerStep('callback', NormalStepComponent);
    this.stepRegistry.registerStep('end', NormalStepComponent);

    // this.customOps.push(  {
    //   paletteName: 'aaaa',
    //   step: {
    //template: this.normalStepTemplate,
    //type: 'aaaa',
    //data: {
    //  name: 'adsads adsad'
    //}
    //   }
    // } )
  }

  onDrop(d: NgFlowchart.DropEvent) {}

  onDropError(error: NgFlowchart.DropError) {
    console.log(error);
  }

  onMoveError(error: NgFlowchart.MoveError) {
    console.log(error);
  }

  beforeDeleteStep(step: any) {
    console.log(JSON.stringify(step.children));
  }

  afterDeleteStep(step: any) {
    console.log(JSON.stringify(step.children));
  }

  showUpload() {}

  showFlowData() {}

  clearData() {
    this.workflowOptions = JSON.parse(this.defaultWorkFlowOptions);
    this.canvas.getFlow().clear();
    this.closeProperyPanel();
    this.closeSettingsPanel();
  }

  onGapChanged(event: any) {
    this.options = {
      ...this.options,
      stepGap: parseInt(event.target.value),
    };
  }

  onSequentialChange(event: any) {
    this.options = {
      ...this.options,
      isSequential: event.target.checked,
    };
  }

  onDelete(withchild: boolean) {
    /// this.canvas.getFlow().getStep(id).destroy(true);
    this.modal.confirm({
      nzTitle:
        'Are you sure delete this node' +
        (withchild ? ' with all the childs' : '') +
        '?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.nodeCommService.deleteSelectedNode(this.canvas, withchild);
        this.closeProperyPanel();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  exportData(type: any) {
    let exported = this.canvas.getFlow().toJSON(0);
    let workflowData = {
      settings: this.workflowOptions,
      workflow: JSON.parse(exported),
    };
    if (type == 'DSL') {
      this.dataExport = JSON.stringify(this.convt.convertToDSL(workflowData));
    }

    if (type == 'JSON') {
      this.dataExport = JSON.stringify(workflowData);
    }
    this.showModal();
  }

  importData() {
    this.showModal();
    this.isimport = true;
    this.dataExport = this.dataExport ||  '{"settings":{"id":"customerapplication","name":"Customer Application Workflow","version":"1.1","timeouts":{"workflowExecTimeout":{"duration":"PT10M"},"actionExecTimeout":"PT10S"},"retries":[{"name":"WorkflowRetries","delay":"PT3S","maxAttempts":10}]},"workflow":{"root":{"id":"s1667302205526","type":"input","data":{"name":"NewCustomerApplication","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"actions":true,"evt_name":true},"evt_name":"OnApplicationStart"},"children":[{"id":"s1667302208171","type":"execute","data":{"name":"CheckCustomerInfo","icon":"code","iconColor":"rgb(255 0 0)","description":"Invoke Check Customer Info Function","has":{"mvel":false,"actions":true},"action":"CheckCustomerInfo"},"children":[{"id":"s1667302434818","type":"router","data":{"name":"MakeApplicationDecision","icon":"cluster","iconColor":"rgb(255 141 0)","description":"Condition to route group","subdata":{"name":"Route","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":2}},"children":[{"id":"s1667302435968","type":"route-step","data":{"name":"ApproveApplication","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":1,"mvel":"${ .incomming.customer.name== \\"pratik\\" }"},"children":[{"id":"s1667635546415","type":"execute","data":{"name":"Approved Application","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"ApproveApplication"},"children":[{"id":"s1667634773399","type":"sleep","data":{"name":"Sleep","icon":"clock-circle","iconColor":"rgb(0 63 204)","description":"Sleep the workflow","sleep":"PT10S","has":{"mvel":false,"sleepinput":true}},"children":[{"id":"s1667302563587","type":"input","data":{"name":"WaitForInput","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"actions":true,"evt_name":true},"evt_name":"OnDocumentUpload"},"children":[{"id":"s1667302603917","type":"execute","data":{"name":"FileUpload","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"RejectApplication"},"children":[{"id":"s1667370039980","type":"input","data":{"name":"Input Signal","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"evt_name":true},"evt_name":"ABCD"},"children":[{"id":"s1667302606981","type":"end","data":{"name":"Complete","icon":"check-circle","iconColor":"rgb(0 204 53)","description":"Complete the workflow","has":{"mvel":false}},"children":[]}]}]}]}]}]}]},{"id":"s1667302436536","type":"route-step","data":{"name":"RejectApplication","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":2,"mvel":"${ .incomming.customer.name == \\"naik\\" }"},"children":[{"id":"s1667302520444","type":"execute","data":{"name":"Reject Application","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"RejectApplication"},"children":[{"id":"s1667302580431","type":"end","data":{"name":"Complete","icon":"check-circle","iconColor":"rgb(0 204 53)","description":"Complete the workflow","has":{"mvel":false}},"children":[]}]}]}]}]}]}}}';

  }

  isModalVisible = false;
  dataExport = '';
  modaltitle = 'Export/Import';
  isimport = false;
  showModal(): void {
    this.isimport = false;
    this.isModalVisible = true;
  }

  handleOk(): void {



    let data = JSON.parse(this.dataExport);


    this.isModalVisible = false;
    this.workflowOptions = data.settings;
    this.canvas
      .getFlow()
      .upload(
        data.workflow
      )
      .then((k: any) => {
        console.log(k);
      })
      .catch((k: any) => {
        console.log(k);
      });


      //  '{"settings":{"id":"customerapplication","name":"Customer Application Workflow","version":"1.1","timeouts":{"workflowExecTimeout":{"duration":"PT10M"},"actionExecTimeout":"PT10S"},"retries":[{"name":"WorkflowRetries","delay":"PT3S","maxAttempts":10}]},"workflow":{"root":{"id":"s1667302205526","type":"input","data":{"name":"NewCustomerApplication","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"actions":true,"evt_name":true},"evt_name":"OnApplicationStart"},"children":[{"id":"s1667302208171","type":"execute","data":{"name":"CheckCustomerInfo","icon":"code","iconColor":"rgb(255 0 0)","description":"Invoke Check Customer Info Function","has":{"mvel":false,"actions":true},"action":"CheckCustomerInfo"},"children":[{"id":"s1667302434818","type":"router","data":{"name":"MakeApplicationDecision","icon":"cluster","iconColor":"rgb(255 141 0)","description":"Condition to route group","subdata":{"name":"Route","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":2}},"children":[{"id":"s1667302435968","type":"route-step","data":{"name":"ApproveApplication","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":1,"mvel":"${ .incomming.customer.name== \"pratik\" }"},"children":[{"id":"s1667635546415","type":"execute","data":{"name":"Approved Application","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"ApproveApplication"},"children":[{"id":"s1667634773399","type":"sleep","data":{"name":"Sleep","icon":"clock-circle","iconColor":"rgb(0 63 204)","description":"Sleep the workflow","sleep":"PT10S","has":{"mvel":false,"sleepinput":true}},"children":[{"id":"s1667302563587","type":"input","data":{"name":"WaitForInput","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"actions":true,"evt_name":true},"evt_name":"OnDocumentUpload"},"children":[{"id":"s1667302603917","type":"execute","data":{"name":"FileUpload","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"RejectApplication"},"children":[{"id":"s1667370039980","type":"input","data":{"name":"Input Signal","icon":"edit","iconColor":"rgb(1 159 144)","description":"Waiting for input","has":{"mvel":true,"evt_name":true},"evt_name":"ABCD"},"children":[{"id":"s1667302606981","type":"end","data":{"name":"Complete","icon":"check-circle","iconColor":"rgb(0 204 53)","description":"Complete the workflow","has":{"mvel":false}},"children":[]}]}]}]}]}]}]},{"id":"s1667302436536","type":"route-step","data":{"name":"RejectApplication","icon":"branches","iconColor":"rgb(14 10 0)","description":"Condition","has":{"mvel":true},"sequence":2,"mvel":"${ .incomming.customer.name == \"naik\" }"},"children":[{"id":"s1667302520444","type":"execute","data":{"name":"Reject Application","icon":"code","iconColor":"rgb(255 0 0)","description":"Execute the activity","has":{"mvel":false,"actions":true},"action":"RejectApplication"},"children":[{"id":"s1667302580431","type":"end","data":{"name":"Complete","icon":"check-circle","iconColor":"rgb(0 204 53)","description":"Complete the workflow","has":{"mvel":false}},"children":[]}]}]}]}]}]}}}'
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
