import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  schoolName: string;
  emRank: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
  }

  ngOnInit() {
    this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + this.urn).
    subscribe(result => {
      const emModel = result as EMModel;
      this.schoolName = emModel.contextData.establishmentName;
      this.emRank = emModel.efficiencyMetricData.efficiencydecileingroup;
    });
  }

}
