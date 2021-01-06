import { ViewModeService } from './../services/viewMode.service';
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

  constructor(private route: ActivatedRoute, @Inject(appSettings) public settings: AppSettings, titleService: TitleService, viewModeService: ViewModeService) {
    viewModeService.setSupportMode();
    titleService.setWithPrefix("Introduction");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
    });
  }

  ngOnInit() {
  }

}
