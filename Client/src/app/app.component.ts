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
import { WebSocketService } from './websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


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

  public userId:any = [];
  receivedMessages: string[] = [];

  constructor(private titleService: Title, private auth: AuthService, private userStore: UserStoreService, public router: Router, private http:HttpClient, private websocketService: WebSocketService, private snackBar: MatSnackBar, private apiservice: BlogApiService) { } // Inject the Title service

  ngOnInit() {
    this.titleService.setTitle('BlogExplorer'); // Set the browser tab title

    this.userStore.getUserNameFromStore()
    .subscribe(val=>{
      let userNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || userNameFromToken
    });
    this.websocketService.connect();
    this.websocketService.messageReceived.subscribe((message: string) => {
      const topicObj = JSON.parse(message);
      if (this.userId) {
      this.apiservice.getFavTopicList().subscribe(topics => {
        // Check if topic is favourite
        const isFavoriteTopic = topics.some(topic => topic.topicId.toString() == topicObj.topicId.toString() && topic.userId == this.userId);
        if (isFavoriteTopic && topicObj.userId != this.userId) {
          this.receivedMessages.push(message);
          this.openSnackBar('New comment to: ' + topicObj.topicname);
        }
      });
    }});

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
        this.userStore.getUserIdFromStore().subscribe(val => {
            let userIdFromToken = this.auth.getUserIdFromToken();
            this.userId = val || userIdFromToken;
        });
      } else {
        this.userName = null;
        this.role = null;
        this.userId = null;
      }
    });
  }

  logOut(){
    this.auth.signOut();
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 2000, // A snackbar megjelenési ideje milliszekundumban
    });
  }

}

