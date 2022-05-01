import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  updateUserForm = this.fb.group({
    firstName: ['', Validators.pattern('[a-zA-Z]*')],
    lastName: ['', Validators.pattern('[a-zA-Z]*')],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
  });

  errors: string[] = [];

  successMessage = '';

  @ViewChild('message')
  private message!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let id = this.auth.GetUserId();

    if (id != null && id.length > 0) {
      this.auth.GetUser(parseInt(id)).subscribe((res) => {
        let formatedDate = new Date(res.data.dob)
          .toISOString()
          .substring(0, 10);
        if (res) {
          this.updateUserForm.patchValue({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dob: formatedDate,
            gender: res.data.gender,
          });
        }
      });
    }
  }

  onSubmit(): void {
    let inputs = this.updateUserForm.value;
    let schema = [];

    for (let prop in inputs) {
      schema.push({
        path: prop,
        op: 'replace',
        value: inputs[prop],
      });
    }

    let body = JSON.stringify(schema);

    this.auth
      .UpdateUser(body)
      .pipe(
        catchError((err) => {
          this.errors.push(err.error.message);
          return of(`Bad Promise: ${err.error}`);
        })
      )
      .subscribe((res) => {
        this.successMessage = 'User updated successfully';
        this.errors = [];
        setTimeout(() => this.message.nativeElement.remove(), 2000);
      });
  }

  logout() {
    this.auth.Logout();
    this.router.navigate(['/']);
  }
}
