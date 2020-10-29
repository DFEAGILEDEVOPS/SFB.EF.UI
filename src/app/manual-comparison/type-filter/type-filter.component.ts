import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterItem } from 'app/Models/FilterItem';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.scss']
})
export class TypeFilterComponent implements OnInit {

  filterTypes: Array<FilterItem>;
  filterTypesCollapsed: boolean;

  @Output() filterChanged = new EventEmitter();

  constructor() {
    this.filterTypesCollapsed = true;
    this.filterTypes = new Array<FilterItem>();
  }

  ngOnInit() {
  }

  get selectedFilterTypes() {
    return this.filterTypes.filter(f => f.value).map(f => f.key);
  }

  buildTypeFiltersFromDataModel(visibleSchoolList) {
    visibleSchoolList.map(n => n.schoolType).forEach(n => {
      if (!this.filterTypes.map(f => f.key).includes(n)) {
        this.filterTypes.push(new FilterItem(n));
      }
    });
  }

  emitFilterResults() {
    this.filterChanged.emit();
  }

  isFiltered(type: string) {
    return this.selectedFilterTypes.length === 0 || this.selectedFilterTypes.includes(type);
  }

}
