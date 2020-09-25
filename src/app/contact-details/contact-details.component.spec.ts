import { EMModel } from './../Models/EMModel';
import { EmdataService } from './../core/network/services/emdata.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContactDetailsComponent } from './contact-details.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { appSettingsFactory } from '@core/config/app-config.module';
import { ConfigService } from '@ngx-config/core';
import { URLService } from '@core/network/services/URL.service';
import { of } from 'rxjs';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
  let emDataServiceSpy =  jasmine.createSpyObj('EmdataService', ['getEmData']);
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EmdataService, useValue: emDataServiceSpy },
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
    let stubEmModel = new EMModel();
    let stubNeigbourModel = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel.urn = 123;
    stubEmModel.neighbourDataModels = [stubNeigbourModel]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should display mobile version when screen size is in mobile limits', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    component.isMobileScreen = true;

    fixture.detectChanges();

    let mTable = fixture.debugElement.query(By.css('.mobile-table'));
    expect(mTable).not.toBeNull();
    let schoolList = fixture.debugElement.query(By.css('#schoolList'));
    expect(schoolList).toBeNull();
  });

  it('should display desktop version when screen size is not in mobile limits', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    component.isMobileScreen = false;

    fixture.detectChanges();

    let schoolList = fixture.debugElement.query(By.css('#schoolList'));
    expect(schoolList).not.toBeNull();
    let mTable = fixture.debugElement.query(By.css('.mobile-table'));
    expect(mTable).toBeNull();
  });

});
