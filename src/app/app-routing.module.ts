import { MetricComponent } from './metric/metric.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';

const routes: Routes = [
  { path: 'efficiency-metric/:urn', component: MetricComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
