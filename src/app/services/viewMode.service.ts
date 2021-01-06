import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {

  mode: string;

  constructor() {
    this.mode = "metric";
  }

  setMetricMode() {
    this.mode = "metric";
  }

  setSupportMode() {
    this.mode = "support";
  }

  isMetricMode() : boolean {
    return this.mode === "metric";
  }
}
