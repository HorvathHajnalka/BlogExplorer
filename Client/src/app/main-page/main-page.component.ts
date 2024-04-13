import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Component decorator that defines the basic configurations like selector, modules needed, and template files.
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

// close the component, when redirection to another url
export class MainPageComponent implements OnInit {
  isVisible = true;  // Tracks whether to show or hide certain UI elements

  constructor(private router: Router) { } // Injects the Router service for navigation and routing event handling

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
