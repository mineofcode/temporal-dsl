import { Component } from '@angular/core';
import {
  NgFlowchart,
  NgFlowchartStepComponent,
} from '@joelwenzel/ng-flowchart';

@Component({
  selector: 'app-normal-step',
  templateUrl: './normal-step.component.html',
  styleUrls: ['./normal-step.component.scss'],
})
export class NormalStepComponent extends NgFlowchartStepComponent {
  me: any = {};

  override ngOnInit(): void {
    this.me = {
      id: this.id,
      type: this.type,
      data: this.data,
    };
  }

  override getDropPositionsForStep(
    step: NgFlowchart.Step
  ): NgFlowchart.DropPosition[] {
    debugger;
    console.log(step, this);
    if (this.type === 'end') {
      return [];
    } else if (this.type === 'sleep' || step.type === 'sleep') {
      return ['BELOW'];
    } else if (this.type === 'input' || step.type === 'input') {
      return ['BELOW', 'ABOVE'];
    } else {
      return ['LEFT', 'RIGHT', 'BELOW', 'ABOVE'];
    }
  }
}
