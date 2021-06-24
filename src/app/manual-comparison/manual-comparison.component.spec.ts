import { BackRoutingService } from './../services/back-routing.service';
import { ReligionFilterComponent } from './religion-filter/religion-filter.component';
import { EmdataService } from '@core/network/services/emdata.service';
import { BsModalService } from 'ngx-bootstrap/modal';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

describe('ManualComparisonComponent', () => {
  let component: ManualComparisonComponent;
  let fixture: ComponentFixture<ManualComparisonComponent>;

  let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);
  let bsModalServiceSpy = jasmine.createSpyObj("BsModalService", ['show'])
  let emDataServiceSpy =  jasmine.createSpyObj('EmdataService', ['getEmData']);
  let backRoutingServiceSpy =  jasmine.createSpyObj('BackRoutingService', ['setPreviousUrl']);

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ ManualComparisonComponent, ReligionFilterComponent ],
      providers: [
        { provide: EmdataService, useValue: emDataServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] },
        { provide: BsModalService, useValue: bsModalServiceSpy },
        { provide: BackRoutingService, useValue: backRoutingServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRouteStub.setParamMap({ urn: 12 });
    configServiceSpy.getSettings.and.returnValue({appSettings: new AppSettings()});
    urlServiceSpy.getDomain.and.returnValue("localhost");
  });

  it('should sort alphabetically by default', () => {
    sessionStorage.clear();
    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.visibleSchoolList[0]).toEqual(stubNeigbourModel2);
    expect(component.visibleSchoolList[1]).toEqual(stubNeigbourModel1);
  });

  it('should not display the home school in the list', () => {
    sessionStorage.clear();
    activatedRouteStub.setParamMap({ urn: 123 });

    let stubEmModel : EMModel = {urn: 123, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.visibleSchoolList[0]).toEqual(stubNeigbourModel2);

  });

  it('should add to basket', () => {
    sessionStorage.clear();
    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;

    component.addToManualBasket(123);
    component.addToManualBasket(124);

    fixture.detectChanges();

    expect(component.selectedSchoolUrns.length).toEqual(2);

  });

  it('should remove from basket', () => {
    sessionStorage.clear();
    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;

    component.selectedSchoolUrns= [123, 124];

    component.removeFromManualBasket(123);

    fixture.detectChanges();

    expect(component.selectedSchoolUrns.length).toEqual(1);
    expect(component.selectedSchoolUrns[0]).toEqual(124);

  });

  it('should not allow to add more than 30 schools to basket', () => {
    sessionStorage.clear();

    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;

    for (let index = 0; index < 30; index++) {
      component.selectedSchoolUrns.push(index);
    }

    component.addToManualBasket(123);

    expect(component.selectedSchoolUrns.length).toBe(30);

  });

  it('should load the basket from session storage if available', () => {
    sessionStorage.setItem("urn-selection", "123, 124");

    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;

    expect(component.selectedSchoolUrns.length).toBe(2);

  });

  it('should not load the basket from session storage if not available', () => {
    sessionStorage.clear();

    let stubEmModel : EMModel = {urn: 12, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "b school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "a school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;

    expect(component.selectedSchoolUrns.length).toBe(0);

  });

});
