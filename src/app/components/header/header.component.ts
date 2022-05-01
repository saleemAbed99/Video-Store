import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.Logout();
    this.router.navigate(['/']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToFavorite() {
    this.router.navigate(['home/favorite']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  getRole() {
    return this.auth.GetRole();
  }
}
