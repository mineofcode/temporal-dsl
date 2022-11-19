import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { NormalStepComponent } from './custom-step/normal-step/normal-step.component';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { EditorComponent } from './editor/editor.component';
import { NodeComponent } from './node/node-template';
import { PropertiesComponent } from './properties/properties.component';
import { ToolBoxComponent } from './toolbox/toolbox.component';


@NgModule({
    imports: [
        Ng2SearchPipeModule,
        NzBadgeModule,
        NzTagModule,
        NzPageHeaderModule,
        NzToolTipModule,
        NzModalModule,
        NzInputNumberModule,
        NzSelectModule,
        NzDividerModule,
        NzButtonModule,
        NzInputModule,
        NzDrawerModule,
        NzIconModule,
        NzCardModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        NgFlowchartModule
    ],
    exports: [EditorComponent, ToolBoxComponent],
    declarations: [EditorComponent, CustomStepComponent, NormalStepComponent,
        RouteStepComponent, NodeComponent, ToolBoxComponent],
    providers: [],
})
export class DesignerBoxModule { }
