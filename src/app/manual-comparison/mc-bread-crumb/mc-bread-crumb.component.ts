import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-mc-bread-crumb',
  templateUrl: './mc-bread-crumb.component.html',
  styleUrls: ['./mc-bread-crumb.component.css']
})
export class McBreadCrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {
  }

  ngOnInit() {
  }

}
