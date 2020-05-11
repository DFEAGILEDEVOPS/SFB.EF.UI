import { EmdataService } from '../core/network/services/emdata.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {
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
      this.model = result;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
  }
}