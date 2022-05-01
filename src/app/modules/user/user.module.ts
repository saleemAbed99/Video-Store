import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UGalleryItemComponent } from './components/ugallery-item/ugallery-item.component';
import { UVideoItemComponent } from './components/uvideo-item/uvideo-item.component';
import { UVideoPageComponent } from './components/uvideo-page/uvideo-page.component';
import { UGalleryPageComponent } from './components/ugallery-page/ugallery-page.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

@NgModule({
  declarations: [HomeComponent, UGalleryItemComponent, UVideoItemComponent, UVideoPageComponent, UGalleryPageComponent, FavoriteListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserModule {}
