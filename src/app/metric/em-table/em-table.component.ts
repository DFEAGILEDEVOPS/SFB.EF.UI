import { Component, OnInit, Input, Inject } from '@angular/core';
import { EMModel } from 'app/Models/EMModel';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-em-table',
  templateUrl: './em-table.component.html',
  styleUrls: ['./em-table.component.scss']
})
export class EmTableComponent implements OnInit {

  @Input() model: EMModel;

  constructor(@Inject(appSettings) public settings: AppSettings) {
  }

  ngOnInit() {
  }
}
