import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogApiService } from '../../services/blog-api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control instanceof FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('password2');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
  }
  return null;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  isVisible = true;  // Tracks whether to show or hide certain UI elements

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  type2: string = "password";
  isText2: boolean = false;
  eyeIcon2: string = "fa-eye-slash";

  registrationForm!: FormGroup;
  registrationError: string = '';

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private service: AuthService,
    private snackBar: MatSnackBar
  ) { } // Injects the Router service for navigation and routing event handling

  ngOnInit() {
    this.registrationForm = this.fb.group({
      // this field is required
      username: ['',Validators.required],
      name: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
    }, { validators: passwordMatchValidator });

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
  hideShowPass2(){
  this.isText2 = !this.isText2;
  this.isText2 ? this.eyeIcon2 = "fa-eye" : this.eyeIcon2 = "fa-eye-slash";
  this.isText2 ? this.type2 = "text" : this.type2 = "password";
  }

  onRegister(){
    if(this.registrationForm.valid){
      // send obj. to database
      // console.log(this.loginForm.value)
      this.service.signUp(this.registrationForm.value)
      .subscribe({
        next:(res)=>{
          this.registrationForm.reset();
          this.router.navigate(['login']);
          this.snackBar.open(res.message, '', {
            duration: 3000,  // popup duration (milliseconds)
            verticalPosition: 'top' // popup position
          });
        },
        error: (err) => {
          this.registrationError = err?.error.message; 
        }
      })

    }else{
      // throw error
      //console.log("Form is not valid")
      this.validateAllFormFields(this.registrationForm);

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
