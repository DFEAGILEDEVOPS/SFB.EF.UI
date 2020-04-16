import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { GovUkLayoutModule } from '@layouts/gov-uk-layout/gov-uk-layout.module';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EmTableComponent } from './em-table/em-table.component';
import { WaysToImproveComponent } from './ways-to-improve/ways-to-improve.component';
import { MetricComponent } from './metric/metric.component';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    GovUkLayoutComponent,
    MetricComponent,
    BreadCrumbComponent,
    WaysToImproveComponent,
    EmTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    CoreModule.forRoot(),
    GovUkLayoutModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
