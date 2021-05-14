import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterItem } from 'app/Models/FilterItem';

@Component({
  selector: 'app-ranks-filter',
  templateUrl: './ranks-filter.component.html',
  styleUrls: ['./ranks-filter.component.css']
})
export class RanksFilterComponent implements OnInit {
  filterRanksCollapsed: boolean;
  filterRanks: Array<FilterItem>;

  @Output() onFilterChanged = new EventEmitter();

  constructor() {
    this.filterRanksCollapsed = false;
    this.filterRanks = [
      new FilterItem('1'),
      new FilterItem('2'),
      new FilterItem('3'),
      new FilterItem('4'),
      new FilterItem('5'),
      new FilterItem('6'),
      new FilterItem('7'),
      new FilterItem('8'),
      new FilterItem('9'),
      new FilterItem('10'),
    ];
   }

   get selectedFilterRanks() {
    return this.filterRanks.filter(f => f.value).map(f => f.key);
  }

  ngOnInit() {
  }

  emitFilterResults() {
    this.onFilterChanged.emit();
  }

  isFiltered(rank: number) {
    return this.selectedFilterRanks.length === 0 || this.selectedFilterRanks.includes(rank.toString());
  }

}
