import { TestBed, inject } from '@angular/core/testing';

import { FinancialControllerService } from './financial-controller.service';

describe('FinancialControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinancialControllerService]
    });
  });

  it('should be created', inject([FinancialControllerService], (service: FinancialControllerService) => {
    expect(service).toBeTruthy();
  }));
});
