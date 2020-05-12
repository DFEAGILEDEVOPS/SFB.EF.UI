import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-how-it-is-calculated',
  templateUrl: './how-it-is-calculated.component.html',
  styleUrls: ['./how-it-is-calculated.component.css']
})
export class HowItIsCalculatedComponent implements OnInit {
  urn: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
  }
  ngOnInit() {
  }

}
