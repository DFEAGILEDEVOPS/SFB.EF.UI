import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EMModel } from 'app/Models/EMModel';
import { tap, catchError } from 'rxjs/operators';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class EmdataService {

constructor(private http: HttpClient, @Inject(appSettings) private settings: AppSettings) { }

getEmData(urn: number): Observable<EMModel> {
  return this.http.get<EMModel>(`${this.settings.apiDomain}/efficiencymetric/${urn}`)
    .pipe(
      tap(_ => this.log('fetched emData'))
    );
}

private log(message: string) {
  // this.messageService.add(`HeroService: ${message}`);
}

}
