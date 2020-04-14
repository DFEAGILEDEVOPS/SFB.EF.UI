/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmdataService } from './emdata.service';

describe('Service: EmdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmdataService]
    });
  });

  it('should ...', inject([EmdataService], (service: EmdataService) => {
    expect(service).toBeTruthy();
  }));
});
