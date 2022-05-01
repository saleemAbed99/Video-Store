import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { VideoPageComponent } from './components/video-page/video-page.component';
import { VideoItemComponent } from './components/video-item/video-item.component';

@NgModule({
  declarations: [
    AdminPortalComponent,
    GalleryItemComponent,
    GalleryPageComponent,
    VideoPageComponent,
    VideoItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
