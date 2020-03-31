import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GovUkLayoutComponent } from './gov-uk-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GovUkLayoutComponent, HeaderComponent, FooterComponent, NotFoundComponent]
})
export class GovUkLayoutModule { }
