import { Component, OnInit, Inject, Input, NgZone, Output, EventEmitter, OnChanges } from '@angular/core';
import { tileLayer, latLng, marker, icon, latLngBounds } from 'leaflet';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';

@Component({
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.css']
})
export class ContactMapComponent implements OnInit, OnChanges {

  map: any;
  mapOptions: any;
  mapLayers: any[];
  mapFitBounds: any;
  mapLoaded: boolean;

  @Input() visibleSchoolList: Array<EfficiencyMetricNeighbourModel>;

  constructor(
    @Inject(appSettings) private settings: AppSettings) {
    this.mapLayers = [];
    this.mapLoaded = false;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.renderMapPinsForAzureMap();
  }

  bindAzureMap() {
    if (!this.mapLoaded) {
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

    this.renderMapPinsForAzureMap();
  }

  private renderMapPinsForAzureMap() {

    if (this.mapLoaded) {
      let latLangs = [];
      this.mapLayers = [];

      this.visibleSchoolList.forEach(school => {
        let schoolMarker = marker(latLng(Number(school.location.coordinates[1]), Number(school.location.coordinates[0])),
          {
            icon: icon({
              iconUrl: '/assets/images/icon-location.png',
              iconSize: [20, 32]
            })
          });

        schoolMarker.bindPopup(() => {
          let divElement = document.createElement('div');
          divElement.className = 'infowindow-school-summary';
          divElement.innerHTML = `<a href ="${this.settings.sfbDomain}/school/detail?urn=${school.urn}">${school.name}</a>
                                  <p>${school.address}</p>
                                  <p>${school.overallPhase}</p>
                                  <p>${school.schoolType}</p>
                                  <p>${school.telephone}</p>`;
          return divElement;
        });

        this.mapLayers.push(schoolMarker);
        latLangs.push([school.location.coordinates[1], school.location.coordinates[0]]);
      });

      this.mapFitBounds = latLngBounds(latLangs);
    }
  }
}
