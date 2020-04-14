import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmdataService {

constructor(private http: HttpClient) { }

getEmData(urn: number) {
  return this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + urn);
}

}
