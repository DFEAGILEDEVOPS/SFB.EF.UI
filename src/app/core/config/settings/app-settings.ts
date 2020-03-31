import { InjectionToken } from '@angular/core';
import { MetaTag } from '../../seo/models';

export class AppSettings {
  apiDomain: string;
  domain: string;
  name: string;
  version: string;
  demo: boolean;
  logo: string;
  seo: MetaTag;
}

export let appSettings = new InjectionToken<AppSettings>('AppSettings');
