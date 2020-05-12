import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmdataService } from '@core/network/services/emdata.service';
import { EMModel } from 'app/Models/EMModel';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  urn: number;
  model: EMModel;

  constructor(
    private route: ActivatedRoute,
    @Inject(appSettings) public settings: AppSettings,
    private emDataService: EmdataService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
    this.model = new EMModel();
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
    subscribe(result => {
      this.model = result;
    });
  }
}
