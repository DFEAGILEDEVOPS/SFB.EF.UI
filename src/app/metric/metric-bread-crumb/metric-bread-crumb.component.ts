import { AppSettings } from './../../core/config/settings/app-settings';
import { environment } from '@env/environment';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-metric-bread-crumb',
  templateUrl: './metric-bread-crumb.component.html',
  styleUrls: ['./metric-bread-crumb.component.scss']
})
export class MetricBreadcrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
