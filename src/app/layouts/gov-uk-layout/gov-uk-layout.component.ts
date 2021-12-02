import { BackRoutingService } from './../../services/back-routing.service';
import { Component, OnInit, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';


@Component({
  selector: 'app-gov-uk-layout',
  templateUrl: './gov-uk-layout.component.html',
  styleUrls: ['./gov-uk-layout.component.scss']
})
export class GovUkLayoutComponent implements OnInit {
  urn: number;

  constructor(
  @Inject(appSettings) public settings: AppSettings,
  private backRoutingService: BackRoutingService
  ) { }

  ngOnInit() { }

  onBack() {
    this.backRoutingService.goBack();
  }

  showBack(){
    return this.backRoutingService.isTherePreviousUrl();
  }

}
