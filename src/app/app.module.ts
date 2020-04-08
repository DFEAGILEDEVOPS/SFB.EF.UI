import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { BasicLayoutModule } from './layouts/basic-layout/basic-layout.module';
import { GovUkLayoutModule } from '@layouts/gov-uk-layout/gov-uk-layout.module';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    CoreModule.forRoot(),
    BasicLayoutModule,
    GovUkLayoutModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
