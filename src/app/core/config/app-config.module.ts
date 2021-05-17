import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';

import { environment } from '@env/environment';
import { URLService } from '@core/network/services/URL.service';
import { appSettings, AppSettings } from './settings/app-settings';

export function configLoaderFactory(http: HttpClient): ConfigLoader {
  let endpoint = `/assets/configuration/config.${environment.name}.json`;
  return new ConfigHttpLoader(http, endpoint);
}

export function appSettingsFactory(configService: ConfigService, urlService: URLService): AppSettings {
  let appsettings: AppSettings = configService.getSettings().appSettings;
  appsettings.domain = urlService.getDomain();
  return appsettings;
}

let configProviders = [
  { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] },
];

@NgModule({
  imports: [
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: configLoaderFactory,
      deps: [HttpClient]
    })
  ],
  providers: [...configProviders]
})
export class AppConfigModule { }

