import { Component, OnInit, Inject } from '@angular/core';
import { CookiesService } from 'app/services/cookies.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-gov-uk-layout',
  templateUrl: './gov-uk-layout.component.html',
  styleUrls: ['./gov-uk-layout.component.scss']
})
export class GovUkLayoutComponent implements OnInit {

  constructor(@Inject(appSettings) public settings: AppSettings, private cookiesService: CookiesService) { }

  ngOnInit() {
    this.cookiesService.manageCookies();
  }

  acceptAllCookies() {
    this.cookiesService.acceptAllCookies();
  }

  acceptedHide() {
    this.cookiesService.acceptedHide();
  }
}
