import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ways-to-improve',
  templateUrl: './ways-to-improve.component.html',
  styleUrls: ['./ways-to-improve.component.scss']
})
export class WaysToImproveComponent implements OnInit {

  @Output() showDetails = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitShowDetails() {
    this.showDetails.emit();
  }
}
