import { Component } from '@angular/core';

import { RouteStepComponent } from './route-step/route-step.component';
import {
  NgFlowchart,
  NgFlowchartStepComponent,
} from '@joelwenzel/ng-flowchart';

@Component({
  selector: 'app-custom-step',
  templateUrl: './custom-step.component.html',
  styleUrls: ['./custom-step.component.scss'],
})
export class CustomStepComponent extends NgFlowchartStepComponent {
  routes: any = [];

  me: any = {};

  override ngOnInit(): void {
    this.me = {
      id: this.id,
      type: this.type,
      data: this.data,
    };
  }
  override canDrop(dropEvent: NgFlowchart.DropTarget): boolean {
    return true;
  }

  override canDeleteStep(): boolean {
    return true;
  }

  override getDropPositionsForStep(
    pendingStep: NgFlowchart.PendingStep
  ): NgFlowchart.DropPosition[] {
    if (pendingStep.type == 'route-step') {
      return [];
    } else {
      return ['ABOVE'];
    }
  }

  onAddRoute(e: Event) {
    let route: any = this.me?.data?.subdata || {
      name: 'Route',
    };
    let index = this.routes.push(route);
    route.sequence = index;

    this.addChild(
      {
        template: RouteStepComponent,
        type: 'route-step',
        data: route,
      },
      {
        sibling: true,
      }
    );
    e.preventDefault();
  }

  delete() {
    //recursively delete
    this.destroy(true);
  }
}
