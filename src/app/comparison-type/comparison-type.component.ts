import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-comparison-type',
  templateUrl: './comparison-type.component.html',
  styleUrls: ['./comparison-type.component.css']
})
export class ComparisonTypeComponent implements OnInit {

  urn: number;
  name: string;

  constructor(private route: ActivatedRoute, @Inject(appSettings) public settings: AppSettings) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
    });
  }

  ngOnInit() {
  }

}
