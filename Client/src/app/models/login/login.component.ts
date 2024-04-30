import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BlogApiService } from '../../services/blog-api.service'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    isVisible = true;  // Tracks whether to show or hide certain UI elements

    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";

    loginForm!: FormGroup;
    loginError: string = '';
  
    constructor(
      private router: Router,
      private fb: FormBuilder,
      private service: AuthService,
      private userStore: UserStoreService,
      private snackBar: MatSnackBar
      ) { } // Injects the Router service for navigation and routing event handling
  
    ngOnInit() {
      this.loginForm = this.fb.group({
        // this field is required
        username: ['',Validators.required],
        password: ['',Validators.required]
      })

      // Subscribe to routing events to listen for changes in navigation
      this.router.events.subscribe((event: Event) => {
        // Check if the navigation has ended
        if (event instanceof NavigationEnd) {
          // Set visibility based on whether the current route is the root URL
          this.isVisible = this.router.url === '/';
        }
      });
    }

    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        // login success
        next: (res) => {
          this.loginForm.reset();
          this.service.storeToken(res.token);
          let tokenPayload = this.service.decodedToken();
          this.userStore.setUserNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['topics']);

          // popup message, when login was successful
          this.snackBar.open(res.message, '', {
            duration: 3000,  // popup duration (milliseconds)
            // popup position
            verticalPosition: 'top',
            panelClass: 'custom-snackbar' 
          });
          
        },
        // login failed
        error: (err) => {
          this.loginError = err?.error.message; 
        }
      });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

  }
  