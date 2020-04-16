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

  tableState: string;
  columnState: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {
    this.tableState = 'full';
    this.columnState = 'school-data';
  }

  ngOnInit() {
  }

  onTableDecileToggle() {
    this.tableState = this.tableState === 'full' ? 'decileOnly' : 'full';
  }

  onColumnDetailsToggle() {
    this.columnState = this.columnState === 'school-data' ? 'contact-details' : 'school-data';
  }

  onColumnDetailsShow() {
    this.columnState = 'contact-details';
    this.scroll(document.querySelector('#emTable') );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
