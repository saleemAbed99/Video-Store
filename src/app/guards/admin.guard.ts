import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.IsLoggedIn()) {
      if (this.auth.GetRole()?.toLowerCase() === 'admin') {
        return true;
      } else if (this.auth.GetRole()?.toLowerCase() === 'user') {
        this.router.navigate(['home']);
        return false;
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
