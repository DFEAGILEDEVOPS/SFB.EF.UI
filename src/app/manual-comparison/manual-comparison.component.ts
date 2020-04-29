import { Component, OnInit, Inject, TemplateRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmdataService } from '@core/network/services/emdata.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { tileLayer, latLng, marker, icon, latLngBounds } from 'leaflet';
import { RanksFilterComponent } from './ranks-filter/ranks-filter.component';
import { OfstedFilterComponent } from './ofsted-filter/ofsted-filter.component';
import { ReligionFilterComponent } from './religion-filter/religion-filter.component';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.scss']
})
export class ManualComparisonComponent implements OnInit {

  @ViewChild('basketFullModal')
  private basketFullModal: TemplateRef<any>;

  @ViewChild('ranksFilter')
  private ranksFilter: RanksFilterComponent;

  @ViewChild('ofstedFilter')
  private ofstedFilter: OfstedFilterComponent;

  @ViewChild('religionFilter')
  private religionFilter: ReligionFilterComponent;

  urn: number;
  model: EMModel;
  modalRef: BsModalRef;
  selectedSchoolUrns: Array<number>;
  sort: string;
  visibleSchoolList: Array<EfficiencyMetricNeighbourModel>;
  resultSectionState: string;
  map: any;
  mapLoaded: boolean;
  mapOptions: any;
  mapLayers: any[];
  mapFitBounds: any;

  constructor(
    private zone: NgZone,
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
    this.resultSectionState = 'list-view';
    this.visibleSchoolList = [];
    this.mapLoaded = false;
    this.mapLayers = [];
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
      subscribe(result => {
        this.model = result;
        this.model.neighbourDataModels = this.model.neighbourDataModels.filter(n => n.urn !== this.urn);
        this.visibleSchoolList = Array.from(this.model.neighbourDataModels);
        this.religionFilter.buildReligionFiltersFromDataModel(this.visibleSchoolList);
        this.sortSchools();
      });
  }

  private bindAzureMap() {
    if (!this.mapLoaded && this.resultSectionState === 'map-view') {

      this.mapOptions = {
        layers: [
          tileLayer('https://atlas.microsoft.com/map/tile/png?api-version=1&layer=basic&style=main&zoom={z}&x={x}&y={y}&subscription-key='
            + this.settings.azureMapsAPIKey,
            {
              maxZoom: 18,
              attribution: '© ' + new Date().getFullYear() + ' Microsoft, © 1992 - ' + new Date().getFullYear() + ' TomTom'
            })
        ],
        zoom: 6,
        center: latLng(52.636, -1.139),
        maxZoom: 18,
        minZoom: 4,
        id: 'azuremaps.road',
        crossOrigin: true,
        subscriptionKey: this.settings.azureMapsAPIKey
      };

      this.mapLoaded = true;
    }

    this.renderMapPinsForAzureMap(this.visibleSchoolList);
  }

  sortSchools() {
    this.visibleSchoolList = this.visibleSchoolList.sort((n1, n2) => this.sortByName(n1.name, n2.name));
  }

  onResultSectionStateToggle() {
    this.resultSectionState = this.resultSectionState === 'list-view' ? 'map-view' : 'list-view';
    setTimeout(() => {
      this.bindAzureMap();
    }, 100);

  }

  addRemoveFromMapPopup(urn: number, button: HTMLButtonElement) {
    this.zone.run(
      () => {
        if (this.selectedSchoolUrns.includes(urn)) {
          this.removeFromManualBasket(urn);
          button.textContent = 'Add';
        } else {
          if (this.addToManualBasket(urn)) {
            button.textContent = 'Remove';
          }
        }
      }
    );
  }

  addToManualBasket(urn: number): boolean {
    if (this.selectedSchoolUrns.length < 30) {
      this.selectedSchoolUrns.push(urn);
      return true;
    } else {
      this.openModal(this.basketFullModal);
      return false;
    }
  }

  removeFromManualBasket(urn) {
    this.selectedSchoolUrns = this.selectedSchoolUrns.filter(s => s !== urn);
  }

  filterResults() {
    this.visibleSchoolList = this.model.neighbourDataModels
      .filter(n => this.ranksFilter.isFiltered(n.rank))
      .filter(n => this.ofstedFilter.isFiltered(n.ofstedRating))
      .filter(n => this.religionFilter.isFiltered(n.religiousCharacter));

    this.sortSchools();
    this.bindAzureMap();
  }

  private sortByName(name1: string, name2: string) {
    if (this.sort === 'AlphabeticalAZ') {
      return name1.toUpperCase() > name2.toUpperCase() ? 1 : -1;
    } else {
      return name1.toUpperCase() > name2.toUpperCase() ? -1 : 1;
    }
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { animated: false, class: 'sfb-modal-dialog' });
  }

  private renderMapPinsForAzureMap(schools) {

    const latLangs = [];
    this.mapLayers = [];

    schools.forEach(school => {
      const schoolMarker = marker(latLng(school.location.coordinates[1], school.location.coordinates[0]),
        {
          icon: icon({
            iconUrl: '/assets/images/icon-location.png',
            iconSize: [20, 32]
          })
        });

      schoolMarker.bindPopup(() => {
        const divElement = document.createElement('div');
        divElement.className = 'infowindow-school-summary';
        divElement.innerHTML = `<a href ="${this.settings.sfbDomain}/school/detail?urn=${school.urn}">${school.name}</a>
        <p>${school.address}</p>
        <p>${school.overallPhase}</p>
        <p>${school.schoolType}</p>`;
        const buttonElement = document.createElement('button');
        buttonElement.className = 'govuk-button govuk-button--secondary';
        buttonElement.textContent = this.selectedSchoolUrns.includes(school.urn) ? 'Remove' : 'Add';
        buttonElement.addEventListener('click', () => this.addRemoveFromMapPopup(school.urn, buttonElement));
        divElement.appendChild(buttonElement);
        return divElement;
      });

      this.mapLayers.push(schoolMarker);
      latLangs.push([school.location.coordinates[1], school.location.coordinates[0]]);
    });

    this.mapFitBounds = latLngBounds(latLangs);
  }
}


