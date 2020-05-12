import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ways-to-improve',
  templateUrl: './ways-to-improve.component.html',
  styleUrls: ['./ways-to-improve.component.scss']
})
export class WaysToImproveComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.name = params.name;
    });
  }

  ngOnInit() {
  }
}
