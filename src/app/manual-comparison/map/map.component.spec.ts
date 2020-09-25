/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { appSettingsFactory } from '@core/config/app-config.module';
import { ConfigService } from '@ngx-config/core';
import { URLService } from '@core/network/services/URL.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    configServiceSpy.getSettings.and.returnValue({appSettings: new AppSettings()});
    urlServiceSpy.getDomain.and.returnValue("localhost");
    
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
