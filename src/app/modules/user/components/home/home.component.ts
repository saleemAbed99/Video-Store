import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  galleries: any[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private galleryServices: GalleryService
  ) {}

  ngOnInit(): void {
    this.getGalleries();
  }

  getGalleries() {
    this.galleryServices
      .GetAllGalleries()
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
}
