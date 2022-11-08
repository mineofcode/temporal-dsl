import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomStepComponent } from './custom-step/custom-step.component';
import { RouteStepComponent } from './custom-step/route-step/route-step.component';
import { FormsModule } from '@angular/forms';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NodeComponent } from './node/node-template';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'; 
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NormalStepComponent } from './custom-step/normal-step/normal-step.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CustomStepComponent,
    RouteStepComponent,
    NodeComponent,
    NormalStepComponent
  ],
  imports: [ 
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
    BrowserModule,
    NgFlowchartModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
