import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogApiService } from '../blog-api.service'; 

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
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

  constructor(private router: Router, private fb: FormBuilder, private service: BlogApiService) { } // Injects the Router service for navigation and routing event handling

  ngOnInit() {
    this.registrationForm = this.fb.group({
      // this field is required
      username: ['',Validators.required],
      name: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
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
          alert(res.message);
          this.registrationForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }else{
      // throw error
      //console.log("Form is not valid")

      this.validateAllFormFields(this.registrationForm);
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
