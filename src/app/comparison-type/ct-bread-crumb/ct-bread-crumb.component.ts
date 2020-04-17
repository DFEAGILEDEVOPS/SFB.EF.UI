import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-ct-bread-crumb',
  templateUrl: './ct-bread-crumb.component.html',
  styleUrls: ['./ct-bread-crumb.component.css']
})
export class CtBreadCrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {
  }

  ngOnInit() {
  }

}
