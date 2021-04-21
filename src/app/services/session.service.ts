import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  readonly sessionKey = "urn-selection";
  constructor() { }

  storeSelectionInSession(selectedSchoolUrns) {
    sessionStorage.setItem(this.sessionKey, selectedSchoolUrns.join(","));
  }

  loadSelectionFromSession(): Array<number> {
    let selectedSchoolUrns = new Array<number>();
    let selection = sessionStorage.getItem(this.sessionKey);
    if (selection) {
      selection.split(",").forEach(element => {
        selectedSchoolUrns.push(Number(element));
      });
    }
    return selectedSchoolUrns;
  }

  clearSession() {
    sessionStorage.clear();
  }
}
