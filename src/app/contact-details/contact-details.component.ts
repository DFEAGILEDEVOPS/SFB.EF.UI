import { Component, OnInit, Inject, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmdataService } from '@core/network/services/emdata.service';
import { EMModel } from 'app/Models/EMModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { MapComponent } from 'app/manual-comparison/map/map.component';
import { ContactMapComponent } from './contact-map/contact-map.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  urn: number;
  model: EMModel;
  sort: string;
  visibleSchoolList: Array<EfficiencyMetricNeighbourModel>;
  resultSectionState: string;
  isMobileScreen: boolean;
  tabletBreakPoint = 641;

  @ViewChild(ContactMapComponent)
  private map: ContactMapComponent;

  constructor(
    private route: ActivatedRoute,
    @Inject(appSettings) public settings: AppSettings,
    private emDataService: EmdataService) {
    this.route.paramMap.subscribe(pmap => {
      this.urn = +pmap.get('urn');
    });
    this.model = new EMModel();
    this.sort = 'Rank';
    this.visibleSchoolList = [];
    this.resultSectionState = 'list-view';
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result;
      this.visibleSchoolList = Array.from(this.model.neighbourDataModels);
    });
  }

  onResultSectionStateToggle() {
    this.resultSectionState = this.resultSectionState === 'list-view' ? 'map-view' : 'list-view';
    if (this.resultSectionState === 'map-view') {
      this.map.bindAzureMap();
    }
  }

  sortSchools() {
    if (this.sort === 'Rank') {
      this.visibleSchoolList = this.visibleSchoolList.sort((n1, n2) => this.sortByRank(n1.rank, n2.rank));
    } else {
      this.visibleSchoolList = this.visibleSchoolList.sort((n1, n2) => this.sortByName(n1.name, n2.name));
    }
  }

  private sortByName(name1: string, name2: string) {
    if (this.sort === 'AlphabeticalAZ') {
      return name1.toUpperCase() > name2.toUpperCase() ? 1 : -1;
    } else {
      return name1.toUpperCase() > name2.toUpperCase() ? -1 : 1;
    }
  }

  private sortByRank(rank1: number, rank2: number) {
      return rank1 > rank2 ? 1 : -1;
  }
}
