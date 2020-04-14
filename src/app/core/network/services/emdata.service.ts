import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EmdataService {

constructor(private http: HttpClient) { }

getEmData(urn: number) {
  //return this.http.get('https://aa-t1dv-sfb.azurewebsites.net/api/efficiencymetric/' + urn);
  return this.http.get(`${environment.apiDomain}/api/efficiencymetric/${urn}`);
}

}
