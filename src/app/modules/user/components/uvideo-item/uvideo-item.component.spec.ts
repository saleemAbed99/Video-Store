import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UVideoItemComponent } from './uvideo-item.component';

describe('UVideoItemComponent', () => {
  let component: UVideoItemComponent;
  let fixture: ComponentFixture<UVideoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UVideoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UVideoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
