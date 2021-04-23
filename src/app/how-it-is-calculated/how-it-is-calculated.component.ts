import { BackRoutingService } from './../services/back-routing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'app/services/title.service';


@Component({
  selector: 'app-how-it-is-calculated',
  templateUrl: './how-it-is-calculated.component.html',
  styleUrls: ['./how-it-is-calculated.component.css']
})
export class HowItIsCalculatedComponent implements OnInit {
  urn: number;

  constructor(private route: ActivatedRoute, titleService: TitleService, backRoutingService: BackRoutingService) {

    titleService.setWithPrefix("How the efficiency metric is calculated");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      backRoutingService.setPreviousUrl(`/efficiency-metric/metric/${this.urn}`)
    });
  }
  ngOnInit() {
  }

}
