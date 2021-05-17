import { BackRoutingService } from './../services/back-routing.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';
import { TitleService } from 'app/services/title.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  urn: number;
  name: string;

  constructor(private route: ActivatedRoute, @Inject(appSettings) settings: AppSettings, titleService: TitleService, backRoutingService: BackRoutingService) {
    titleService.setWithPrefix("Introduction");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
      backRoutingService.setPreviousUrl(`${settings.sfbDomain}/School/start-benchmarking?urn=${this.urn}`)
    });
  }

  ngOnInit() {
  }

}
