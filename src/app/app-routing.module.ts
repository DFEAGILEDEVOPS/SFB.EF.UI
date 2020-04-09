import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';

const mainRoutes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'efficiency-metric/:urn', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
];

const appRoutes: Routes = [
  { path: '', component: GovUkLayoutComponent, children: mainRoutes },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
