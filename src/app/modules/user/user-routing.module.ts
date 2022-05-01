import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { UVideoPageComponent } from './components/uvideo-page/uvideo-page.component';
import { UGalleryPageComponent } from './components/ugallery-page/ugallery-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorite', component: FavoriteListComponent },
  { path: 'gallery/:id', component: UGalleryPageComponent },
  { path: 'gallery/:id/video/:id', component: UVideoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
