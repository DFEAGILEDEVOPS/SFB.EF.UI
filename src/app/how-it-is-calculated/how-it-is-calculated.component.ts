import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'app/services/title.service';
import { ViewModeService } from 'app/services/viewMode.service';

@Component({
  selector: 'app-how-it-is-calculated',
  templateUrl: './how-it-is-calculated.component.html',
  styleUrls: ['./how-it-is-calculated.component.css']
})
export class HowItIsCalculatedComponent implements OnInit {
  urn: number;

  constructor(private route: ActivatedRoute, titleService: TitleService, viewModeService: ViewModeService) {
    viewModeService.setSupportMode();
    titleService.setWithPrefix("How the efficiency metric is calculated");
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
  }
  ngOnInit() {
  }

}
