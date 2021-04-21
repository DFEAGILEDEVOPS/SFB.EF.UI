import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { SessionService } from 'app/services/session.service';
import { TitleService } from 'app/services/title.service';
import { ViewModeService } from 'app/services/viewMode.service';

@Component({
  selector: 'app-comparison-type',
  templateUrl: './comparison-type.component.html',
  styleUrls: ['./comparison-type.component.css']
})
export class ComparisonTypeComponent implements OnInit {

  urn: number;
  name: string;
  comparisonType: string;

  constructor(private route: ActivatedRoute,private sessionService: SessionService, private router: Router, @Inject(appSettings) public settings: AppSettings, titleService: TitleService, viewModeService: ViewModeService) {
    viewModeService.setSupportMode();
    titleService.setWithPrefix("Select comparison type");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
    });
    this.comparisonType = 'EfficiencyTop';
  }

  ngOnInit() {
  }

  onContinue() {
    if (this.comparisonType === 'EfficiencyTop') {
      window.open(
        `${this.settings.sfbDomain}/BenchmarkCharts/GenerateFromEfficiencyMetricsTop?urn=${this.urn}`, '_self');
    } else {
      this.sessionService.clearSession();
      this.router.navigate(['efficiency-metric/manual-comparison', this.urn]);
    }
  }

}
