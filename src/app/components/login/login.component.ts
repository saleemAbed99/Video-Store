import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, pipe, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    password: ['', Validators.required],
  });

  errors: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.IsLoggedIn()) {
      if (this.auth.GetRole()?.toLowerCase() == 'admin') {
        this.router.navigate(['admin']);
      } else if (this.auth.GetRole()?.toLowerCase() == 'user') {
        this.router.navigate(['home']);
      }
    }
  }

  onSubmit(): void {
    this.auth
      .LoginUser(this.loginForm.value)
      .pipe(
        catchError((err) => {
          this.errors.push(err.error.message);
          return of(`Bad Promise: ${err.error}`);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.auth.SetToken(res.data);
          if (this.auth.GetRole()?.toLowerCase() == 'admin') {
            this.router.navigate(['admin']);
          } else if (this.auth.GetRole()?.toLowerCase() == 'user') {
            this.router.navigate(['home']);
          }
        }
      });
  }
}
