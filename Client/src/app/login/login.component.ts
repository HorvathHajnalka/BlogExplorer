import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    isVisible = true;  // Tracks whether to show or hide certain UI elements

    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";

    loginForm!: FormGroup;
  
    constructor(private router: Router, private fb: FormBuilder) { } // Injects the Router service for navigation and routing event handling
  
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

  onSubmit(){
    if(this.loginForm.valid){
      // send obj. to database
      // console.log(this.loginForm.value)

    }else{
      // throw error
      //console.log("Form is not valid")

      this.validateAllFormFields(this.loginForm);
      alert("Invalid input")

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
  