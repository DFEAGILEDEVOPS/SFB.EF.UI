import { Component, OnInit, Inject, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmdataService } from '@core/network/services/emdata.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';

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
  selectedSchoolUrns: Array<number>;
  sort: string;
  filterReligions: Array<FilterItem>;
  filterRanks: Array<FilterItem>;
  filterOfsteds: Array<FilterItem>;
  visibleSchoolList: Array<EfficiencyMetricNeighbourModel>;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private emDataService: EmdataService,
    @Inject(appSettings) public settings: AppSettings) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.model = new EMModel();
      this.selectedSchoolUrns = new Array<number>();
      this.sort = 'AlphabeticalAZ';
      this.filterReligions = new Array<FilterItem>();
      this.filterRanks = [
        new FilterItem('1'),
        new FilterItem('2'),
        new FilterItem('3'),
        new FilterItem('4'),
        new FilterItem('5'),
        new FilterItem('6'),
        new FilterItem('7'),
        new FilterItem('8'),
        new FilterItem('9'),
        new FilterItem('10'),
      ];
      this.filterOfsteds = [
        new FilterItem('0'),
        new FilterItem('1'),
        new FilterItem('2'),
        new FilterItem('3'),
        new FilterItem('4')
      ];
    }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result;
      this.model.neighbourDataModels = this.model.neighbourDataModels.filter(n => n.urn !== this.urn);
      this.visibleSchoolList = Array.from(this.model.neighbourDataModels);
      this.sortSchools();
      this.buildReligionFiltersFromDataModel();
    });
  }

  sortSchools() {
    this.visibleSchoolList = this.visibleSchoolList.sort((n1, n2) => this.sortByName(n1.name, n2.name));
  }

  addToManualBasket(urn) {
    if (this.selectedSchoolUrns.length < 30) {
      this.selectedSchoolUrns.push(urn);
    } else {
      this.openModal(this.basketFullModal);
    }
  }

  removeFromManualBasket(urn) {
    this.selectedSchoolUrns = this.selectedSchoolUrns.filter(s => s !== urn);
  }

  filterResults() {
    this.visibleSchoolList = this.model.neighbourDataModels
    .filter(n => this.selectedFilterRanks.length === 0 || this.selectedFilterRanks.includes(n.rank.toString()))
    .filter(n => this.selectedFilterOfsteds.length === 0 || this.selectedFilterOfsteds.includes(n.ofstedRating.toString()))
    .filter(n => this.selectedFilterReligions.length === 0 || this.selectedFilterReligions.includes(n.religiousCharacter.toString()));
    this.sortSchools();
  }

  ofstedNoInText(rank: string) {
    switch (rank) {
      case '0':
        return 'Not rated';
      case '1':
        return 'Outstanding';
      case '2':
        return 'Good';
      case '3':
        return 'Requires improvement';
      case '4':
        return 'Inadequate';
    }
  }

  private buildReligionFiltersFromDataModel() {
    this.visibleSchoolList.map(n => n.religiousCharacter).forEach(n => {
      if (!this.filterReligions.map(f => f.key).includes(n)) {
        this.filterReligions.push(new FilterItem(n));
      }
    });
  }

  private sortByName(name1: string, name2: string) {
    if (this.sort === 'AlphabeticalAZ') {
      return name1.toUpperCase() > name2.toUpperCase() ? 1 : -1;
    } else {
      return name1.toUpperCase() > name2.toUpperCase() ? -1 : 1;
    }
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
  }

  private get selectedFilterRanks() {
    return this.filterRanks.filter(f => f.value).map(f => f.key);
  }

  private get selectedFilterOfsteds() {
    return this.filterOfsteds.filter(f => f.value).map(f => f.key);
  }

  private get selectedFilterReligions() {
    return this.filterReligions.filter(f => f.value).map(f => f.key);
  }

  get diagnostic() { return JSON.stringify(this.selectedFilterRanks); }

}

class FilterItem {
  constructor(public key: string, public value: boolean = false) {}
}
