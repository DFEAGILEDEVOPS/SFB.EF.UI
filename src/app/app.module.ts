import { PhaseFilterComponent } from './manual-comparison/phase-filter/phase-filter.component';
import { TypeFilterComponent } from './manual-comparison/type-filter/type-filter.component';
import { ContactMapComponent } from './contact-details/contact-map/contact-map.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HowItIsCalculatedComponent } from './how-it-is-calculated/how-it-is-calculated.component';
import { MapComponent } from './manual-comparison/map/map.component';
import { ReligionFilterComponent } from './manual-comparison/religion-filter/religion-filter.component';
import { OfstedFilterComponent } from './manual-comparison/ofsted-filter/ofsted-filter.component';
import { RanksFilterComponent } from './manual-comparison/ranks-filter/ranks-filter.component';
import { McBreadCrumbComponent } from './manual-comparison/mc-bread-crumb/mc-bread-crumb.component';
import { ManualComparisonComponent } from './manual-comparison/manual-comparison.component';
import { FormsModule } from '@angular/forms';
import { CtBreadCrumbComponent } from './comparison-type/ct-bread-crumb/ct-bread-crumb.component';
import { ComparisonTypeComponent } from './comparison-type/comparison-type.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MetricBreadcrumbComponent as MetricBreadcrumbComponent } from './metric/metric-bread-crumb/metric-bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { GovUkLayoutModule } from '@layouts/gov-uk-layout/gov-uk-layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmTableDesktopComponent } from './metric/em-table-desktop/em-table-desktop.component';
import { WaysToImproveComponent } from './ways-to-improve/ways-to-improve.component';
import { MetricComponent } from './metric/metric.component';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';
import { HiwBreadCrumbComponent } from './how-it-works/hiw-bread-crumb/hiw-bread-crumb.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GlobalErrorHandler } from '@core/error-handling/GlobalErrorHandler';
import { EmTableMobileComponent } from './metric/em-table-mobile/em-table-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    GovUkLayoutComponent,
    MetricComponent,
    MetricBreadcrumbComponent,
    WaysToImproveComponent,
    EmTableDesktopComponent,
    EmTableMobileComponent,
    HowItWorksComponent,
    HiwBreadCrumbComponent,
    ComparisonTypeComponent,
    CtBreadCrumbComponent,
    ManualComparisonComponent,
    McBreadCrumbComponent,
    RanksFilterComponent,
    OfstedFilterComponent,
    ReligionFilterComponent,
    TypeFilterComponent,
    PhaseFilterComponent,
    MapComponent,
    HowItIsCalculatedComponent,
    ContactDetailsComponent,
    ContactMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    CoreModule.forRoot(),
    GovUkLayoutModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    LeafletModule
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
