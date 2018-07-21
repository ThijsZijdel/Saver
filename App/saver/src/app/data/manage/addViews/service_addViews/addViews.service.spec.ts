import { TestBed, inject } from '@angular/core/testing';

import { AddViewsService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddViewsService]
    });
  });

  it('should be created', inject([AddViewsService], (service: AddViewsService) => {
    expect(service).toBeTruthy();
  }));
});
