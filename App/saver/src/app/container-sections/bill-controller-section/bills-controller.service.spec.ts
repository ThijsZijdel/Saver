import { TestBed, inject } from '@angular/core/testing';

import { BillsControllerService } from './bills-controller.service';

describe('BillsControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillsControllerService]
    });
  });

  it('should be created', inject([BillsControllerService], (service: BillsControllerService) => {
    expect(service).toBeTruthy();
  }));
});
