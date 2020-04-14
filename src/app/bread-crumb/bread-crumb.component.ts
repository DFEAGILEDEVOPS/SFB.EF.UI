import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
