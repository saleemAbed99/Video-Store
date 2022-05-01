import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.IsLoggedIn()) {
      if (this.auth.GetRole()?.toLowerCase() === 'user') {
        return true;
      } else if (this.auth.GetRole()?.toLowerCase() === 'admin') {
        this.router.navigate(['admin']);
        return false;
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
