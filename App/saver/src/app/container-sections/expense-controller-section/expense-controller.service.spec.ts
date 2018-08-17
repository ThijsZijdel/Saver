import { TestBed, inject } from '@angular/core/testing';

import { ExpenseControllerService } from './expense-controller.service';

describe('ExpenseControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseControllerService]
    });
  });

  it('should be created', inject([ExpenseControllerService], (service: ExpenseControllerService) => {
    expect(service).toBeTruthy();
  }));
});
