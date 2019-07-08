import { TestBed, inject } from '@angular/core/testing';

import { NrService } from './nr.service';

describe('NrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrService]
    });
  });

  it('should be created', inject([NrService], (service: NrService) => {
    expect(service).toBeTruthy();
  }));
});
