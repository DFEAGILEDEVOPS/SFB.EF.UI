import { EmdataService } from '../core/network/services/emdata.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  model: EMModel;
  modalRef: BsModalRef;

  constructor(
  private route: ActivatedRoute,
  private modalService: BsModalService,
  private emDataService: EmdataService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
    this.model = new EMModel();
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result as EMModel;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
  }

  onShowDetails() {
    //onColumnDetailsShow();
    //this.scroll(emTable)
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
