import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterItem } from 'app/Models/FilterItem';

@Component({
  selector: 'app-ofsted-filter',
  templateUrl: './ofsted-filter.component.html',
  styleUrls: ['./ofsted-filter.component.css']
})
export class OfstedFilterComponent implements OnInit {

  filterOfstedsCollapsed: boolean;
  filterOfsteds: Array<FilterItem>;

  @Output() onFilterChanged = new EventEmitter();

  constructor() {
    this.filterOfstedsCollapsed = true;
    this.filterOfsteds = [
      new FilterItem('0'),
      new FilterItem('1'),
      new FilterItem('2'),
      new FilterItem('3'),
      new FilterItem('4')
    ];
  }

  ngOnInit() {
  }

  emitFilterResults() {
    this.onFilterChanged.emit();
  }

  get selectedFilterOfsteds() {
    return this.filterOfsteds.filter(f => f.value).map(f => f.key);
  }

  ofstedNoInText(rank: string) {
    switch (rank) {
      case '0':
        return 'Not rated';
      case '1':
        return 'Outstanding';
      case '2':
        return 'Good';
      case '3':
        return 'Requires improvement';
      case '4':
        return 'Inadequate';
    }
  }

  isFiltered(ofstedRating: string) {
    return this.selectedFilterOfsteds.length === 0 || this.selectedFilterOfsteds.includes(ofstedRating);
  }
}
