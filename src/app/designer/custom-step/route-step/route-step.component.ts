import { Component } from '@angular/core';
import { NgFlowchart, NgFlowchartStepComponent } from '@joelwenzel/ng-flowchart';
 

@Component({
  selector: 'app-route-step',
  templateUrl: './route-step.component.html',
  styleUrls: ['./route-step.component.scss']
})
export class RouteStepComponent extends NgFlowchartStepComponent {
 
  me: any ={};

  override ngOnInit(): void {
      this.me = {
        id: this.id,
        data: this.data
      }
  }

  override getDropPositionsForStep(step: NgFlowchart.Step): NgFlowchart.DropPosition[] {
    console.log(step)    
    if(this.type === 'route-step') {
      return ['BELOW']
    }
    else {
      return ['LEFT', 'RIGHT'];
    }
    
  }

}
