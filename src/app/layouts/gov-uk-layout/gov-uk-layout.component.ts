import { BackRoutingService } from './../../services/back-routing.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { CookiesService } from 'app/services/cookies.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { Location } from '@angular/common';


@Component({
  selector: 'app-gov-uk-layout',
  templateUrl: './gov-uk-layout.component.html',
  styleUrls: ['./gov-uk-layout.component.scss']
})
export class GovUkLayoutComponent implements OnInit {
  urn: number;

  constructor(
  @Inject(appSettings) public settings: AppSettings,
  private cookiesService: CookiesService,
  private backRoutingService: BackRoutingService
  ) { }

  ngOnInit() {
    this.cookiesService.manageCookies();
  }

  acceptAllCookies() {
    this.cookiesService.acceptAllCookies();
  }

  acceptedHide() {
    this.cookiesService.acceptedHide();
  }

  onBack() {
    this.backRoutingService.goBack();
  }

  showBack(){
    return this.backRoutingService.isTherePreviousUrl();
  }

}
