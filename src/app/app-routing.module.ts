import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
// import { NotFoundComponent } from '@layouts/basic-layout/not-found/not-found.component';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';

const mainRoutes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'efficiency-metric/:urn', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'govuk-example', loadChildren: () => import('./gov-uk-example/gov-uk-example.module').then(m => m.GovUkExampleModule) },
];

// const appRoutes: Routes = [
//   { path: '', component: BasicLayoutComponent, children: mainRoutes },
//   { path: '**', component: NotFoundComponent }
// ];

const appRoutes: Routes = [
  { path: '', component: GovUkLayoutComponent, children: mainRoutes },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
