import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z0-9]+'),
      ],
    ],
    dob: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
        ),
      ],
    ],
    confirmPassword: [''],
    gender: ['', Validators.required],
    role: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.auth.RegisterUser(this.registerForm.value).subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }
}
