import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  videos: any[];

  constructor(private videoServices: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.GetVideos();
  }

  RemoveFromFav(id) {
    this.videoServices.DeletFromFavorite(id).subscribe((res) => {
      this.GetVideos();
    });
  }

  AddToFav(id) {
    this.videoServices.AddToFavorite(id).subscribe((res) => {});
  }

  GetVideos(): void {
    this.videos = [];

    this.videoServices.GetFavoriteList().subscribe((res) => {
      console.log(res.data.videos);
      this.videos = res.data.videos;
    });
  }
}
