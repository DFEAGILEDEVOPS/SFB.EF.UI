import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovUkExampleRoutingModule } from './gov-uk-example-routing.module';
import { GovUkExampleComponent } from './gov-uk-example.component';

@NgModule({
  imports: [CommonModule, GovUkExampleRoutingModule],
  declarations: [GovUkExampleComponent]
})
export class GovUkExampleModule { }
