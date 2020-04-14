import { EmTableComponent } from './../em-table/em-table.component';
import { WaysToImproveComponent } from './../ways-to-improve/ways-to-improve.component';
import { BreadCrumbComponent } from './../bread-crumb/bread-crumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, BreadCrumbComponent, WaysToImproveComponent, EmTableComponent]
})
export class HomeModule { }
