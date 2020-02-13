import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {
      console.log(">>>>>>>>>>>>>>>>>admin<<<<<<<<<<<<<<<<<<<<<");
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Inside admin gurd>>>>>>>>>>>>>>>");
    const match = this.authService.roleMatch(['Admin']);
    console.log("match is >>>>>>>>"+match);
    if (match) {
        return true;
      } else {
        this.router.navigate(['/home']);
        this.alertify.error('You are not authorized!');
      }
    return false;
  }
}
