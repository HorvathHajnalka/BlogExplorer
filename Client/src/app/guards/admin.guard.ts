import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(["topics"]);
      // popup message
      this.snackBar.open('Access denied! ', '', {
        duration: 3000,  // popup duration (milliseconds)
        verticalPosition: 'top' // popup position
      });
      return false;
    }
  }
}
