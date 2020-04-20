import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-comparison-type',
  templateUrl: './comparison-type.component.html',
  styleUrls: ['./comparison-type.component.css']
})
export class ComparisonTypeComponent implements OnInit {

  urn: number;
  name: string;
  comparisonType: string;

  constructor(private route: ActivatedRoute, private router: Router, @Inject(appSettings) public settings: AppSettings) {
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
        `${this.settings.sfbDomain}/BenchmarkCharts/GenerateFromEfficiencyMetrics?urn=${this.urn}&comparisonType=EfficiencyTop`, '_self');
    } else {
      this.router.navigate(['efficiency-metric/manual-comparison', this.urn]);
    }
  }

}
