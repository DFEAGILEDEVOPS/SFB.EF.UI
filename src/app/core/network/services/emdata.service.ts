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
  return this.http.get<EMModel>(`${this.settings.apiDomain}/api/efficiencymetric/${urn}`)
    .pipe(
      tap(_ => this.log('fetched emData')),
      catchError(this.handleError<EMModel>('getEmData', new EMModel()))
    );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };

}
private log(message: string) {
  // this.messageService.add(`HeroService: ${message}`);
}

}
