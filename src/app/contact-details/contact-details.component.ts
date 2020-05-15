import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmdataService } from '@core/network/services/emdata.service';
import { EMModel } from 'app/Models/EMModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  urn: number;
  model: EMModel;
  sort: string;
  visibleSchoolList: Array<EfficiencyMetricNeighbourModel>;

  constructor(
    private route: ActivatedRoute,
    @Inject(appSettings) public settings: AppSettings,
    private emDataService: EmdataService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
    this.model = new EMModel();
    this.sort = 'Rank';
    this.visibleSchoolList = [];
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result;
      this.visibleSchoolList = Array.from(this.model.neighbourDataModels);
    });
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
