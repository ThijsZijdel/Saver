import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkAddViewComponent } from './bulkAddView.component';

describe('BulkAddViewComponent', () => {
  let component: BulkAddViewComponent;
  let fixture: ComponentFixture<BulkAddViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkAddViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
