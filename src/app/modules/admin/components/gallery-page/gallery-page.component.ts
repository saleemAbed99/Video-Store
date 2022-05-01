import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css'],
})
export class GalleryPageComponent implements OnInit {
  gallery: any;
  videos: any[];
  successMessage: string = '';

  @ViewChild('message')
  private message!: ElementRef;

  updateGalleryForm = this.fb.group({
    name: ['', Validators.required],
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

  getGallery(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.galleryServices.GetGallery(id).subscribe((res) => {
      console.log(res);
      this.gallery = res.data;
      this.updateGalleryForm.patchValue({
        name: this.gallery.name,
        description: this.gallery.description,
      });
    });
  }

  ngOnInit(): void {
    this.getGallery();
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

  logout(): void {
    this.auth.Logout();
  }

  UpdateGallery(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    let inputs = this.updateGalleryForm.value;
    let schema = [];

    for (let prop in inputs) {
      schema.push({
        path: prop,
        op: 'replace',
        value: inputs[prop],
      });
    }

    let body = JSON.stringify(schema);

    this.galleryServices.UpdateGallery(id, body).subscribe((res) => {
      this.gallery = res.data;
      this.updateGalleryForm.patchValue({
        name: this.gallery.name,
        description: this.gallery.description,
      });
      this.successMessage = 'Gallery Updated Successfully';
      setTimeout(() => this.message.nativeElement.remove(), 2000);
    });
  }

  DeleteVedio(id): void {
    this.videoServices.DeleteVideo(id).subscribe((res) => {
      this.GetVideos();
    });
  }

  onSubmit(): void {
    this.UpdateGallery();
  }
}
