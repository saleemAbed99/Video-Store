import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css'],
})
export class AdminPortalComponent implements OnInit {
  message: string;
  progress: number;
  @Output() onUploadFinished = new EventEmitter();

  delete_gallery_message: string = '';
  @ViewChild('deleteGalleryMessage')
  private deleteGalleryMessage!: ElementRef;

  galleries: any[];

  createGalleryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  uploadVideoForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    video: [null, Validators.required],
    galleryId: ['', Validators.required],
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private galleryServices: GalleryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGalleries();
  }

  getGalleries() {
    this.galleryServices
      .GetAdminGalleries()
      .pipe(
        catchError((err) => {
          return of(`Bad Promise: ${err.error}`);
        })
      )
      .subscribe((res) => {
        console.log(res.data);
        this.galleries = res.data;
      });
  }

  showDeleteGalleryMessage(): void {
    this.delete_gallery_message = 'Gallery has videos. Delete them first.';
    setInterval(() => this.deleteGalleryMessage.nativeElement.remove(), 2000);
  }

  DeleteGallery(id): void {
    let gallery = this.galleries.find((g) => g.id === id);
    if (gallery.numberOfVideos != 0) {
      this.showDeleteGalleryMessage();
    }
    this.galleryServices.DeleteGallery(id).subscribe((res) => {
      this.getGalleries();
    });
  }

  onSubmitGallery(): void {
    this.galleryServices
      .AddGallery(this.createGalleryForm.value)
      .subscribe((res) => {
        this.createGalleryForm.reset();
        this.getGalleries();
      });
  }

  logout(): void {
    this.auth.Logout();
  }

  onUploadVideo(): void {
    let input = this.uploadVideoForm.value;

    const formData = new FormData();
    formData.append('Files', input.video, input.video.name);
    formData.append('Title', input.title);
    formData.append('Description', input.description);
    console.log(input.galleryId);
    formData.append('GalleryId', input.galleryId);

    this.http
      .post('https://localhost:5001/Video/UploadVideo', formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.auth.GetToken()
        ),
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body.toString());
          this.uploadVideoForm.reset();
        }
      });
  }

  uploadFile = (files) => {
    if (files.length === 0) return;

    let fileToUpload = <File>files[0];

    this.uploadVideoForm.patchValue({
      video: fileToUpload,
    });
  };
}
