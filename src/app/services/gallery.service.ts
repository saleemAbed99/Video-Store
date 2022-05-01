import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = 'https://localhost:5001/Gallery/';

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

  GetAllGalleries(): Observable<any> {
    const url = `${this.apiUrl}ListGalleries`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  GetAdminGalleries(): Observable<any> {
    const url = `${this.apiUrl}ListAdminGalleries`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  GetGallery(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  AddGallery(gallery: any): Observable<any> {
    const url = `${this.apiUrl}CreateGallery`;
    return this.http.post(url, gallery, this.httpOptionsWithToken);
  }

  UpdateGallery(id: number, gallery: any): Observable<any> {
    const url = `${this.apiUrl}Update?id=${id}`;
    return this.http.patch(url, gallery, this.httpOptionsWithToken);
  }

  DeleteGallery(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url, this.httpOptionsWithToken);
  }
}
