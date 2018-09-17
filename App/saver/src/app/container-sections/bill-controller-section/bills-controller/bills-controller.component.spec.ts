import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsControllerComponent } from './bills-controller.component';

describe('BillsControllerComponent', () => {
  let component: BillsControllerComponent;
  let fixture: ComponentFixture<BillsControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
