import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { VideoPageComponent } from './components/video-page/video-page.component';

const routes: Routes = [
  { path: '', component: AdminPortalComponent },
  { path: 'admin-gallery/:id', component: GalleryPageComponent },
  { path: 'admin-gallery/:id/video/:id', component: VideoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
