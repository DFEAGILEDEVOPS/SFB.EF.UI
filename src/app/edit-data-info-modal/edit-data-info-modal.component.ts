import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-edit-data-info-modal',
  templateUrl: './edit-data-info-modal.component.html',
  styleUrls: ['./edit-data-info-modal.component.css']
})
export class EditDataInfoModalComponent implements OnInit {

  title: string;
  textContent: string;
  referrer: string;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  onClose() {
    this.bsModalRef.hide();
    document.getElementById(this.referrer).focus();
  }
}
