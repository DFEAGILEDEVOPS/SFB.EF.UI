import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-hiw-bread-crumb',
  templateUrl: './hiw-bread-crumb.component.html',
  styleUrls: ['./hiw-bread-crumb.component.css']
})
export class HiwBreadCrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {
  }

  ngOnInit() {
  }

}
