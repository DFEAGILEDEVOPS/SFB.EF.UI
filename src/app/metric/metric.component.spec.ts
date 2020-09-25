import { EmTableMobileComponent } from './em-table-mobile/em-table-mobile.component';
import { PdfService } from './../services/pdf.service';
import { EMModel } from './../Models/EMModel';
import { EmdataService } from './../core/network/services/emdata.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { appSettingsFactory } from '@core/config/app-config.module';
import { ConfigService } from '@ngx-config/core';
import { URLService } from '@core/network/services/URL.service';
import { of } from 'rxjs';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { MetricComponent } from './metric.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmTableDesktopComponent } from './em-table-desktop/em-table-desktop.component';

describe('MetricComponent', () => {
  let component: MetricComponent;
  let fixture: ComponentFixture<MetricComponent>;

  let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
  let emDataServiceSpy =  jasmine.createSpyObj('EmdataService', ['getEmData']);
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let bsModalServiceSpy = jasmine.createSpyObj("BsModalService", ['_'])
  let pdfServiceSpy = jasmine.createSpyObj("PdfService", ['_'])
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MetricComponent, EmTableDesktopComponent, EmTableMobileComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EmdataService, useValue: emDataServiceSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] },
        { provide: BsModalService, useValue: bsModalServiceSpy },
        { provide: PdfService, useValue: pdfServiceSpy },
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    activatedRouteStub.setParamMap({ urn: 123 });
    configServiceSpy.getSettings.and.returnValue({appSettings: new AppSettings()});
    urlServiceSpy.getDomain.and.returnValue("localhost");
  });

  it('should highlight the home school name in the table', () => {

    let stubEmModel : EMModel = {urn: 123, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "123 school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "124 school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let link = fixture.debugElement.query(By.css('a.govuk-link.table-cell-highlight'));
    expect(link).not.toBeNull();
  });

  it('should highlight the same local authorities in the table', () => {

    let stubEmModel : EMModel = {urn: 123, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "123 school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "124 school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let schoolList = fixture.debugElement.queryAll(By.css('#emTableDesktop span.table-cell-highlight'));
    expect(schoolList.length).toBe(2);
  });

  it('should display the mobile version of the table in mobile mode', () => {

    let stubEmModel : EMModel = {urn: 123, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "123 school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "124 school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;

    component.isMobileScreen = true;

    fixture.detectChanges();

    let mobileTable = fixture.debugElement.query(By.css('table#emTableMobileSummary'));
    expect(mobileTable).toBeDefined();

    let desktopTable = fixture.debugElement.query(By.css('table#emTableDesktop[hidden]'));
    expect(desktopTable).toBeDefined();

  });

  it('should display the percentage of the rank correctly', () => {

    let stubEmModel : EMModel = {urn: 123, name: "Home school", rank: 2, localAuthority: "la1"};
    let stubNeigbourModel1: EfficiencyMetricNeighbourModel = { urn: 123, name: "123 school", localAuthority: "la1"};
    let stubNeigbourModel2: EfficiencyMetricNeighbourModel = { urn: 124, name: "124 school", localAuthority: "la1"};
    stubEmModel.neighbourDataModels = [stubNeigbourModel1, stubNeigbourModel2]
    emDataServiceSpy.getEmData.and.returnValue(of(stubEmModel));

    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    let rankPercent = fixture.debugElement.query(By.css('span#rankPercent'));
    expect(rankPercent.nativeElement.textContent).toBe("10%");

  });

})
