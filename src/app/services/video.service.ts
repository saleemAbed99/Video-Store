import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'https://localhost:5001/Video/';
  private favUrl = 'https://localhost:5001/FavoriteList/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private httpOptionsWithToken = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set(
      'Authorization',
      'Bearer ' + this.auth.GetToken()
    ),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  GetVideo(id: number): Observable<any> {
    const url = `${this.apiUrl}GetVideo/${id}`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  GetVideos(id: number): Observable<any> {
    const url = `${this.apiUrl}GetVideos/${id}`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  DeleteVideo(id: number): Observable<any> {
    const url = `${this.apiUrl}DeleteVideo/${id}`;
    return this.http.delete(url, this.httpOptionsWithToken);
  }

  UpdateVideo(id: number, video: any): Observable<any> {
    const url = `${this.apiUrl}UpdateVideo/${id}`;
    return this.http.patch(url, video, this.httpOptionsWithToken);
  }

  GetFavoriteList(): Observable<any> {
    const url = `${this.favUrl}GetFavoriteList`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  AddToFavorite(video: any): Observable<any> {
    const url = `${this.favUrl}AddVideoToFavoriteList`;
    return this.http.post(url, video, this.httpOptionsWithToken);
  }

  DeletFromFavorite(id: number): Observable<any> {
    const url = `${this.favUrl}DeleteVideoFromFavoriteList/${id}`;
    return this.http.delete(url, this.httpOptionsWithToken);
  }
}
