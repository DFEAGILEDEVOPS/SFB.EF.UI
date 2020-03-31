import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasicLayoutComponent } from './basic-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BasicLayoutComponent, HeaderComponent, FooterComponent, NotFoundComponent]
})
export class BasicLayoutModule { }
