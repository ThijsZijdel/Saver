import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewsComponent } from './message.component';

describe('MessageComponent', () => {
  let component: AddViewsComponent;
  let fixture: ComponentFixture<AddViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
