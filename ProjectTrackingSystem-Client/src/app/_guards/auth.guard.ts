import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService) {
                console.log(">>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<");
              }

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Inside the canActivate auth gurd");
    const roles = next.firstChild.data['roles'] as Array<string>;
    console.log("Inside the CanActivate gar>>>>>>>>>>>>>>>>>>>");
    if (roles) {
      console.log("Inside the CanActivate gar>>>>>>>>>>>>>>>>>>>");
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/home']);
        this.alertify.error('You are not authorized!');
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You are not authorized!');
    this.router.navigate(['/home']);
    return false;
  }
}
