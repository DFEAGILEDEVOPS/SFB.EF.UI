import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urn: number;
  schoolName: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
  }

  ngOnInit() {
    this.schoolName = 'test';
  }

}
