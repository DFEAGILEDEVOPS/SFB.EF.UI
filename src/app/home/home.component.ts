import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMModel } from 'app/Models/EMModel';
import { strict } from 'assert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  model: EMModel;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.model = new EMModel();
    });
  }

  ngOnInit() {
    this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + this.urn).
    subscribe(result => {
      this.model = result as EMModel;
      this.model.neighbourDataModels = this.model.neighbourDataModels.sort((n1, n2) => n1.rank - n2.rank);
    });
  }

}
