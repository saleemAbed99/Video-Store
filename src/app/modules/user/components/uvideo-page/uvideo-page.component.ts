import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-uvideo-page',
  templateUrl: './uvideo-page.component.html',
  styleUrls: ['./uvideo-page.component.css'],
})
export class UVideoPageComponent implements OnInit {
  video: any;

  constructor(
    private videoServices: VideoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  createVideoPath(serverPath: string) {
    return `https://localhost:5001/${serverPath}`;
  }

  getVideo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.videoServices.GetVideo(id).subscribe((res) => {
      this.video = res.data;
    });
  }
}
