import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MetricComponent } from './metric/metric.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';

const routes: Routes = [
  { path: 'efficiency-metric/:urn', component: MetricComponent},
  { path: 'efficiency-metric/metric/:urn', component: MetricComponent},
  { path: 'efficiency-metric/how-it-works/:urn/:name', component: HowItWorksComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
