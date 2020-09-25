import { PdfService } from './../services/pdf.service';
import { EmdataService } from '../core/network/services/emdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {
  urn: number;
  model: EMModel;
  modalRef: BsModalRef;
  isMobileScreen: boolean;
  isMobilePdfInProgress: boolean;
  tabletBreakPoint = 641;
  @ViewChild('downloadingMessage') downloadingMessage: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private emDataService: EmdataService,
              private pdfService: PdfService,
              @Inject(appSettings) public settings: AppSettings) {
    this.route.paramMap.subscribe(pmap => {
      this.urn = +pmap.get('urn');
    });
    this.model = new EMModel();
    this.model.name = 'Your school';
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
    this.isMobilePdfInProgress = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
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

  onDownload() {
    if (this.isMobileScreen) {
      this.isMobilePdfInProgress = true;
      this.downloadingMessage.nativeElement.textContent = "Downloading...";
      setTimeout(() => {
        this.pdfService.generatePdf("mobile").then(() => {
          this.isMobilePdfInProgress = false;
          this.downloadingMessage.nativeElement.textContent = "Download page";
        });
      }, 500);
    }else{
      this.downloadingMessage.nativeElement.textContent = "Downloading...";
      this.pdfService.generatePdf("desktop").then(() => {
        this.downloadingMessage.nativeElement.textContent = "Download page";
      });
    }

  }

  onPrintPage() {
    window.print();
  }

  onGotoBenchmark() {
    this.router.navigate(['efficiency-metric/comparison-type/', this.urn, this.model.name]);
  }
}
