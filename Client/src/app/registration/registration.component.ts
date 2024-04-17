import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterOutlet, RouterLink, RouterLinkActive, Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
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

  constructor(private router: Router) { } // Injects the Router service for navigation and routing event handling

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

  ngOnInit() {
    // Subscribe to routing events to listen for changes in navigation
    this.router.events.subscribe((event: Event) => {
      // Check if the navigation has ended
      if (event instanceof NavigationEnd) {
        // Set visibility based on whether the current route is the root URL
        this.isVisible = this.router.url === '/';
      }
    });
  }
}
