import { TestBed, inject } from '@angular/core/testing';

import { ReleasenotesService } from './releasenotes.service';

describe('ReleasenotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleasenotesService]
    });
  });

  it('should be created', inject([ReleasenotesService], (service: ReleasenotesService) => {
    expect(service).toBeTruthy();
  }));
});
