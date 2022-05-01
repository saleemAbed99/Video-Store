import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UVideoPageComponent } from './uvideo-page.component';

describe('UVideoPageComponent', () => {
  let component: UVideoPageComponent;
  let fixture: ComponentFixture<UVideoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UVideoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
