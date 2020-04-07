import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';
import { strict } from 'assert';
import { stringify } from 'querystring';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  model: EMModel;
  tableState: string;

  constructor(@Inject(appSettings) public appsettings: AppSettings, private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.model = new EMModel();
      this.tableState = 'full';
    });
  }

  ngOnInit() {
    this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + this.urn).
    subscribe(result => {
      this.model = result as EMModel;
    });
  }

  onTableDecileToggle() {
    this.tableState = this.tableState === 'full' ? 'decileOnly' : 'full';
  }
}
