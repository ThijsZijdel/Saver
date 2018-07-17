import { TestBed, inject } from '@angular/core/testing';

import { BalanceTypeService } from './balanceType.service';

describe('BalanceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceTypeService]
    });
  });

  it('should be created', inject([BalanceTypeService], (service: BalanceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
