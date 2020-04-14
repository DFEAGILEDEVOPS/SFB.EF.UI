import { environment } from '@env/environment';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  public environment: any;
  @Input() urn: number;
  @Input() name: string;
  constructor() {
    this.environment = environment;
  }

  ngOnInit() {
  }

}
