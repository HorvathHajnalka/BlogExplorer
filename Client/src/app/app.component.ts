// Import services
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ShowTopicComponent } from './topic/show-topic/show-topic.component';
import { TopicComponent } from './topic/topic.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser'; 
import { BlogApiService } from './services/blog-api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { UserStoreService } from './services/user-store.service';


@Component({
  selector: 'app-root', // The component's CSS selector
  standalone: true, // Marks the component as standalone
  imports: [RouterOutlet, ShowTopicComponent, TopicComponent, HttpClientModule, RouterLink, RouterLinkActive, CommonModule], // Imports necessary modules and components
  providers:[{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true}],
  templateUrl: './app.component.html', // The location of the component's template file
  styleUrls: ['./app.component.css'] // The location of the component's private CSS styles
})
export class AppComponent implements OnInit {
  title = 'angular17-blogexplorer-api'; // Property for the application's title

  public userName:any = [];
  public role:any = [];

  constructor(private titleService: Title, private auth: AuthService, private userStore: UserStoreService, public router: Router, private http:HttpClient) { } // Inject the Title service

  ngOnInit() {
    this.titleService.setTitle('BlogExplorer'); // Set the browser tab title

    this.userStore.getUserNameFromStore()
    .subscribe(val=>{
      let userNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || userNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });

    // Subscribe to AuthService for event loginChanged 
    this.auth.loginChanged.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.userStore.getUserNameFromStore().subscribe(val => {
          let userNameFromToken = this.auth.getUserNameFromToken();
          this.userName = val || userNameFromToken;
        });
        this.userStore.getRoleFromStore().subscribe(val=>{
            let roleFromToken = this.auth.getRoleFromToken();
            this.role = val || roleFromToken
          });
      } else {
        this.userName = null;
        this.role = null;
      }
    });
  }

  logOut(){
    this.auth.signOut();
  }
}

