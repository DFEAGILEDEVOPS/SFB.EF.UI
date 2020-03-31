import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovUkExampleComponent } from './gov-uk-example.component';

const routes: Routes = [
  { path: '', component: GovUkExampleComponent, data: { title: 'Gov UK Example', description: 'Gov UK Example Page' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovUkExampleRoutingModule { }
