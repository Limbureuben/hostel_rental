import { TestBed } from '@angular/core/testing';

import { LandloadServiceService } from './landload-service.service';

describe('LandloadServiceService', () => {
  let service: LandloadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandloadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
