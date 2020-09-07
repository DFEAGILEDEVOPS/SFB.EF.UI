import { InjectionToken } from '@angular/core';
import { MetaTag } from '../../seo/models';

export class AppSettings {
  sfbDomain: string;
  apiDomain: string;
  cookieDomain: string;
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
  seo: MetaTag;
}

export let appSettings = new InjectionToken<AppSettings>('AppSettings');
