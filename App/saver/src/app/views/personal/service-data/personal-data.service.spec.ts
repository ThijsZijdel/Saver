import { TestBed, inject } from '@angular/core/testing';

import { PersonalDataService } from './personal-data.service';

describe('PersonalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalDataService]
    });
  });

  it('should be created', inject([PersonalDataService], (service: PersonalDataService) => {
    expect(service).toBeTruthy();
  }));
});
