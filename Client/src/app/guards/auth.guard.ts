import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogApiService } from '../blog-api.service';
import { NgToastService } from 'ng-angular-popup';
import { MatSnackBar } from '@angular/material/snack-bar';

// guards return a true/false value based on conditions
// if the return value is true it allows you to get access to certain links/activities

// The @Injectable decorator indicates that this class can have dependencies injected into it
@Injectable({
  providedIn: 'root' // This service is provided at the root level which means it is available throughout the app
})
export class AuthGuard implements CanActivate {
  // Injecting BlogApiService
  constructor(private service: BlogApiService, private router: Router, private snackBar: MatSnackBar) {}

  // canActivate is an interface method which needs to be implemented
  // It determines if a route can be activated
  canActivate(
    route: ActivatedRouteSnapshot, // Contains information about a route associated with a component loaded in an outlet at a particular moment in time
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // check if the user is logged in
    if(this.service.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(["login"]);
      // popup message
      this.snackBar.open('Please login first!','', {
        duration: 3000,  // popup duration (milliseconds)
        verticalPosition: 'top' // popup position
      });
      return false;
    }
  }
}


