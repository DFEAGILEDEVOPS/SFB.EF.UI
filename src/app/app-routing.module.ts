import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HowItIsCalculatedComponent } from './how-it-is-calculated/how-it-is-calculated.component';
import { WaysToImproveComponent } from './ways-to-improve/ways-to-improve.component';
import { ManualComparisonComponent } from './manual-comparison/manual-comparison.component';
import { ComparisonTypeComponent } from './comparison-type/comparison-type.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MetricComponent } from './metric/metric.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProblemComponent } from '@core/error-handling/ServiceProblem/ServiceProblem.component';
import { NotFoundErrorComponent } from '@core/error-handling/NotFoundError/NotFoundError.component';

const ROUTES: Routes = [
  //{ path: 'efficiency-metric/:urn', component: MetricComponent},
  { path: 'efficiency-metric/metric/:urn', component: MetricComponent},
  { path: 'efficiency-metric/how-it-works/:urn/:name', component: HowItWorksComponent},
  { path: 'efficiency-metric/ways-to-improve/:urn/:name', component: WaysToImproveComponent},
  { path: 'efficiency-metric/comparison-type/:urn/:name', component: ComparisonTypeComponent},
  { path: 'efficiency-metric/manual-comparison/:urn/:name', component: ManualComparisonComponent},
  { path: 'efficiency-metric/how-it-is-calculated/:urn', component: HowItIsCalculatedComponent},
  { path: 'efficiency-metric/contact-details/:urn', component: ContactDetailsComponent},
  { path: 'service-problem', component: ServiceProblemComponent},
  { path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {scrollPositionRestoration: 'enabled',  useHash: false,  anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
