import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UGalleryItemComponent } from './ugallery-item.component';

describe('UGalleryItemComponent', () => {
  let component: UGalleryItemComponent;
  let fixture: ComponentFixture<UGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UGalleryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
