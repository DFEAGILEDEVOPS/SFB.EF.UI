import { EmdataService } from '@core/network/services/emdata.service';
import { BsModalService } from 'ngx-bootstrap/modal';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { appSettingsFactory } from '@core/config/app-config.module';
import { ConfigService } from '@ngx-config/core';
import { URLService } from '@core/network/services/URL.service';

import { ManualComparisonComponent } from './manual-comparison.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { EMModel } from 'app/Models/EMModel';
import { of } from 'rxjs';
import { ReligionFilterComponent } from './religion-filter/religion-filter.component';

describe('ManualComparisonComponent', () => {
  let component: ManualComparisonComponent;
  let fixture: ComponentFixture<ManualComparisonComponent>;

  let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);
  let bsModalServiceSpy = jasmine.createSpyObj("BsModalService", ['_'])
  let emDataServiceSpy =  jasmine.createSpyObj('EmdataService', ['getEmData']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ManualComparisonComponent, ReligionFilterComponent ],
      providers: [
        { provide: EmdataService, useValue: emDataServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] },
        { provide: BsModalService, useValue: bsModalServiceSpy },
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

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    expect(component).toBeTruthy();
  });
});
