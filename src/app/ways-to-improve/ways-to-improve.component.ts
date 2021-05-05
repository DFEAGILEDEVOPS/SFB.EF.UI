import { BackRoutingService } from './../services/back-routing.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'app/services/title.service';


@Component({
  selector: 'app-ways-to-improve',
  templateUrl: './ways-to-improve.component.html',
  styleUrls: ['./ways-to-improve.component.scss']
})
export class WaysToImproveComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;

  constructor(private route: ActivatedRoute, titleService: TitleService, backRoutingService: BackRoutingService) {

    titleService.setWithPrefix("Tools to improve your school's efficiency");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
      backRoutingService.setPreviousUrl(`/efficiency-metric/metric/${this.urn}`)
    });
  }

  ngOnInit() {
  }
}
