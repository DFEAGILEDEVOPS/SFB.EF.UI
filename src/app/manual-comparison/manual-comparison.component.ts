import { Component, OnInit, Inject, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmdataService } from '@core/network/services/emdata.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.scss']
})
export class ManualComparisonComponent implements OnInit {

  @ViewChild('basketFullModal')
  private basketFullModal: TemplateRef<any>;

  urn: number;
  model: EMModel;
  modalRef: BsModalRef;
  selectedSchools: Array<number>;
  sort: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private emDataService: EmdataService,
    @Inject(appSettings) public settings: AppSettings) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.model = new EMModel();
      this.selectedSchools = new Array<number>();
      this.sort = 'AlphabeticalAZ';
    }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result;
      this.model.neighbourDataModels = this.model.neighbourDataModels.filter(n => n.urn !== this.urn);
      this.sortSchools();
    });
  }

  sortSchools() {
    this.model.neighbourDataModels = this.model.neighbourDataModels.sort((n1, n2) => this.sortByName(n1.name, n2.name));
  }

  addToManualBasket(urn) {
    if (this.selectedSchools.length < 30) {
      this.selectedSchools.push(urn);
    } else {
      this.openModal(this.basketFullModal);
    }
  }

  removeFromManualBasket(urn) {
    this.selectedSchools = this.selectedSchools.filter(s => s !== urn);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
  }

  private sortByName(name1: string, name2: string) {
    if (this.sort === 'AlphabeticalAZ') {
      return name1.toUpperCase() > name2.toUpperCase() ? 1 : -1;
    } else {
      return name1.toUpperCase() > name2.toUpperCase() ? -1 : 1;
    }
  }

}
