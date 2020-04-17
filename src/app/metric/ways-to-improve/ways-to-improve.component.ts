import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ways-to-improve',
  templateUrl: './ways-to-improve.component.html',
  styleUrls: ['./ways-to-improve.component.scss']
})
export class WaysToImproveComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  @Output() showDetails = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitShowDetails() {
    this.showDetails.emit();
  }
}
