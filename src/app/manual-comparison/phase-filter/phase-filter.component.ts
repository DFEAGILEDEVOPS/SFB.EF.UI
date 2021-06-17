import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterItem } from 'app/Models/FilterItem';

@Component({
  selector: 'app-phase-filter',
  templateUrl: './phase-filter.component.html',
  styleUrls: ['./phase-filter.component.scss']
})
export class PhaseFilterComponent implements OnInit {

  filterPhases: Array<FilterItem>;
  filterPhasesCollapsed: boolean;

  @Output() onFilterChanged = new EventEmitter();

  constructor() {
    this.filterPhasesCollapsed = true;
    this.filterPhases = new Array<FilterItem>();
  }

  ngOnInit() {
  }

  get selectedFilterPhases() {
    return this.filterPhases.filter(f => f.value).map(f => f.key);
  }

  buildPhaseFiltersFromDataModel(visibleSchoolList) {
    visibleSchoolList.map(n => n.phase).forEach(n => {
      if (!this.filterPhases.map(f => f.key).includes(n)) {
        this.filterPhases.push(new FilterItem(n));
      }
    });
  }

  emitFilterResults() {
    this.onFilterChanged.emit();
  }

  isFiltered(phase: string) {
    return this.selectedFilterPhases.length === 0 || this.selectedFilterPhases.includes(phase);
  }

}
