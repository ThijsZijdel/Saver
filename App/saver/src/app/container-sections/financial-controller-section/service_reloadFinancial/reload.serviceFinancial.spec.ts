import { TestBed, inject } from '@angular/core/testing';

import { ReloadServiceFinancial } from './reload.serviceFinancial';

describe('ReloadServiceFinancial', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReloadServiceFinancial]
    });
  });

  it('should be created', inject([ReloadServiceFinancial], (service: ReloadServiceFinancial) => {
    expect(service).toBeTruthy();
  }));
});
