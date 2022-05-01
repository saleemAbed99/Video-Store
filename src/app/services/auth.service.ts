import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/Auth/';

  private httpOptionsWithToken = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set(
      'Authorization',
      'Bearer ' + this.GetToken()
    ),
  };

  constructor(private http: HttpClient, private router: Router) {}

  SetToken(token: string): void {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let role = JSON.parse(decodedJwtJsonData).role;
    let userId = JSON.parse(decodedJwtJsonData).nameid;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
  }

  GetToken(): string | null {
    return localStorage.getItem('token');
  }

  GetRole(): string | null {
    return localStorage.getItem('role');
  }

  GetUserId(): string | null {
    return localStorage.getItem('userId');
  }

  IsLoggedIn() {
    return this.GetToken() !== null && this.GetRole() !== null;
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }

  LoginUser(user: any): Observable<any> {
    const url = `${this.apiUrl}Login`;
    return this.http.post(url, user, httpOptions);
  }

  RegisterUser(user: any): Observable<any> {
    const url = `${this.apiUrl}Register`;
    return this.http.post(url, user, httpOptions);
  }

  GetUser(id: number): Observable<any> {
    const url = `${this.apiUrl}GetUser/${id}`;
    return this.http.get(url, this.httpOptionsWithToken);
  }

  UpdateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}Update`;
    return this.http.patch(url, user, this.httpOptionsWithToken);
  }
}
