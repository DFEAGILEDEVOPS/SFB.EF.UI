import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class BackRoutingService {
  previousUrl: string;

  constructor(@Inject(appSettings) public settings: AppSettings, private router: Router) { }

  goBack() {
    if(this.previousUrl.includes("http")){
      window.location.href = this.previousUrl;
    }else{
      this.router.navigateByUrl(this.previousUrl);
    }
  }

  setPreviousUrl(url: string) {
    this.previousUrl = url;
  }

  isTherePreviousUrl(){
    return this.previousUrl != null;
  }
}
