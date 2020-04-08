import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  model: EMModel;
  tableState: string;
  columnState: string;
  modalRef: BsModalRef;

  constructor(@Inject(appSettings) public appsettings: AppSettings,
  private route: ActivatedRoute,
  private http: HttpClient,
  private modalService: BsModalService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.model = new EMModel();
      this.tableState = 'full';
      this.columnState = 'school-data';
    });
  }

  ngOnInit() {
    this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + this.urn).
    subscribe(result => {
      this.model = result as EMModel;
    });
  }

  onTableDecileToggle() {
    this.tableState = this.tableState === 'full' ? 'decileOnly' : 'full';
  }

  onColumnDetailsToggle() {
    this.columnState = this.columnState === 'school-data' ? 'contact-details' : 'school-data';
  }

  onColumnDetailsShow() {
    this.columnState = 'contact-details';    
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
  }

}
