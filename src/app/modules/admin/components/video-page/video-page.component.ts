import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css'],
})
export class VideoPageComponent implements OnInit {
  successMessage: string = '';
  video: any;

  @ViewChild('message')
  private message!: ElementRef;

  updateVideoForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private galleryServices: GalleryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private videoServices: VideoService
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.videoServices.GetVideo(id).subscribe((res) => {
      this.video = res.data;
      this.updateVideoForm.patchValue({
        title: this.video.title,
        description: this.video.description,
      });
    });
  }

  updateVideo() {
    const id = +this.route.snapshot.paramMap.get('id');

    let inputs = this.updateVideoForm.value;
    let schema = [];

    for (let prop in inputs) {
      schema.push({
        path: prop,
        op: 'replace',
        value: inputs[prop],
      });
    }

    let body = JSON.stringify(schema);

    this.videoServices.UpdateVideo(id, body).subscribe((res) => {
      console.log('res: ', res);
      this.video = res.data;
      this.successMessage = 'Video updated successfully';
      setTimeout(() => this.message.nativeElement.remove(), 2000);
    });
  }

  onSubmit() {
    this.updateVideo();
  }

  createVideoPath(serverPath: string) {
    return `https://localhost:5001/${serverPath}`;
  }
}
