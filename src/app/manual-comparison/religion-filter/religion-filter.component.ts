import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FilterItem } from 'app/Models/FilterItem';

@Component({
  selector: 'app-religion-filter',
  templateUrl: './religion-filter.component.html',
  styleUrls: ['./religion-filter.component.css']
})
export class ReligionFilterComponent implements OnInit {

  filterReligions: Array<FilterItem>;
  filterReligionsCollapsed: boolean;

  @Output() filterChanged = new EventEmitter();

  constructor() {
    this.filterReligionsCollapsed = true;
    this.filterReligions = new Array<FilterItem>();
  }

  ngOnInit() {
  }

  get selectedFilterReligions() {
    return this.filterReligions.filter(f => f.value).map(f => f.key);
  }

  buildReligionFiltersFromDataModel(visibleSchoolList) {
    visibleSchoolList.map(n => n.religiousCharacter).forEach(n => {
      if (!this.filterReligions.map(f => f.key).includes(n)) {
        this.filterReligions.push(new FilterItem(n));
      }
    });
  }

  emitFilterResults() {
    this.filterChanged.emit();
  }

  isFiltered(religiousCharacter: string) {
    return this.selectedFilterReligions.length === 0 || this.selectedFilterReligions.includes(religiousCharacter);
  }
}
