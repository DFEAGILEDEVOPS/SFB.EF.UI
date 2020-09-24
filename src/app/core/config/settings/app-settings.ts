import { InjectionToken } from '@angular/core';

export class AppSettings {
  sfbDomain: string;
  apiDomain: string;
  cookieDomain: string;
  academyTerm: string
  maintainedTerm: string;
  customErrorPage: boolean;
  consoleErrors: boolean;
  logExceptions: boolean;
  ai_instrumentationKey: string;
  azureMapsAPIKey: string;
  domain: string;
  name: string;
  version: string;
  demo: boolean;
  logo: string;
}

export let appSettings = new InjectionToken<AppSettings>('AppSettings');
