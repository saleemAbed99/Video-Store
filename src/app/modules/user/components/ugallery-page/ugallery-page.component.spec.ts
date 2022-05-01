import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UGalleryPageComponent } from './ugallery-page.component';

describe('UGalleryPageComponent', () => {
  let component: UGalleryPageComponent;
  let fixture: ComponentFixture<UGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UGalleryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
