import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-ugallery-page',
  templateUrl: './ugallery-page.component.html',
  styleUrls: ['./ugallery-page.component.css'],
})
export class UGalleryPageComponent implements OnInit {
  gallery: any;
  videos: any[];
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private videoServices: VideoService
  ) {}

  ngOnInit(): void {
    this.GetVideos();
  }

  GetVideos(): void {
    this.videos = [];

    const id = +this.route.snapshot.paramMap.get('id');
    this.videoServices.GetVideos(id).subscribe((res) => {
      if (res.data.length > 0) {
        this.videos = res.data;
      }
    });
  }
}
