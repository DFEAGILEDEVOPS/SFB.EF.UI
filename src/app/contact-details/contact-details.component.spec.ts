import { BackRoutingService } from './../services/back-routing.service';
import { EMModel } from './../Models/EMModel';
import { EmdataService } from './../core/network/services/emdata.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
  let backRoutingServiceSpy =  jasmine.createSpyObj('BackRoutingService', ['setPreviousUrl']);

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EmdataService, useValue: emDataServiceSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: BackRoutingService, useValue: backRoutingServiceSpy },
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
    fixture.detectChanges();
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

  it('should display map view version when selected', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    component.resultSectionState = "map-view";

    fixture.detectChanges();

    let mapWrapper = fixture.debugElement.query(By.css('#mapWrapper'));
    expect(mapWrapper).toBeDefined();

    let hiddenMapWrapper = fixture.debugElement.query(By.css('#mapWrapper[hidden]'));
    expect(hiddenMapWrapper).toBeNull();

  });

  it('should display list view version when selected', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    component.resultSectionState = "list-view";

    fixture.detectChanges();

    let listWrapper = fixture.debugElement.query(By.css('#listWrapper'));
    expect(listWrapper).toBeDefined();

    let hiddenListWrapper = fixture.debugElement.query(By.css('#listWrapper[hidden]'));
    expect(hiddenListWrapper).toBeNull();

  });

  it('should sort visible school list by rank', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    let stubEmModel = new EMModel();
    let stubNeigbourModel1 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel1.rank = 1;
    let stubNeigbourModel2 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel2.rank = 2;
    let stubNeigbourModel3 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel3.rank = 3;
    stubEmModel.neighbourDataModels = [stubNeigbourModel3, stubNeigbourModel2, stubNeigbourModel1]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.sortSchools();

    expect(component.visibleSchoolList[0]).toEqual(stubNeigbourModel1);
    expect(component.visibleSchoolList[1]).toEqual(stubNeigbourModel2);
    expect(component.visibleSchoolList[2]).toEqual(stubNeigbourModel3);
  });

  it('should sort visible school list by name asc', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    let stubEmModel = new EMModel();
    let stubNeigbourModel1 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel1.name = "a";
    let stubNeigbourModel2 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel2.name = "b";
    let stubNeigbourModel3 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel3.name = "c";
    stubEmModel.neighbourDataModels = [stubNeigbourModel3, stubNeigbourModel2, stubNeigbourModel1]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.sort = 'AlphabeticalAZ';
    component.sortSchools();

    expect(component.visibleSchoolList[0]).toEqual(stubNeigbourModel1);
    expect(component.visibleSchoolList[1]).toEqual(stubNeigbourModel2);
    expect(component.visibleSchoolList[2]).toEqual(stubNeigbourModel3);
  });

  it('should sort visible school list by name desc', () => {
    activatedRouteStub.setParamMap({ urn: 123 });
    let stubEmModel = new EMModel();
    let stubNeigbourModel1 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel1.name = "a";
    let stubNeigbourModel2 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel2.name = "b";
    let stubNeigbourModel3 = new EfficiencyMetricNeighbourModel();
    stubNeigbourModel3.name = "c";
    stubEmModel.neighbourDataModels = [stubNeigbourModel3, stubNeigbourModel2, stubNeigbourModel1]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.sort = 'AlphabeticalZA';
    component.sortSchools();

    expect(component.visibleSchoolList[0]).toEqual(stubNeigbourModel3);
    expect(component.visibleSchoolList[1]).toEqual(stubNeigbourModel2);
    expect(component.visibleSchoolList[2]).toEqual(stubNeigbourModel1);
  });

});
