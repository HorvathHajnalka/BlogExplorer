import { Observable } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

// Marks the class as one that participates in the dependency injection system.
// The providedIn: 'root' metadata option means that the BlogApiService is available throughout the application.
@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  // The base URL of the blog API.
  readonly blogAPIUrl = "https://localhost:7111/api";

  // Injecting the HttpClient service into this service, enabling HTTP requests.
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  // --------------------------API CALLS FOR TOPIC------------------------------------------------------------------------

  // Retrieves a list of topics from the blog API.
  // Returns an Observable of any type (should ideally be typed to a model/interface representing a topic).
  getTopicList(): Observable<any[]> {
    // Debugging line, logs the Observable to the console (might not display expected data directly, since Observables are lazy).
    //console.log(this.http.get<any>(this.blogAPIUrl + '/Topics'));

    // Makes a GET request to the specified URL and returns the Observable.
    // This Observable will emit the data once the HTTP request is successfully completed.
    return this.http.get<any>(this.blogAPIUrl + '/Topics');
  }

  addTopic(data:any){
    return this.http.post(this.blogAPIUrl + '/Topics', data);
  }

  getTopic(id: number | string) {
    return this.http.get(this.blogAPIUrl + `/Topics/${id}`);
  }

  // use `` ( Alt Gr + 7 ) instead of ''
  updateTopic(id:number|string, data:any){
    return this.http.put(this.blogAPIUrl + `/Topics/${id}`, data);
  }

  deleteTopic(id:number|string){
    return this.http.delete(this.blogAPIUrl + `/Topics/${id}`);
  }

  // --------------------------API CALLS FOR TOPICTYPE ------------------------------------------------------------------------


  getTopicTypeList(): Observable<any[]> {
    return this.http.get<any>(this.blogAPIUrl + '/TopicTypes');
  }

  addTopicType(data:any){
    return this.http.post(this.blogAPIUrl + '/TopicTypes', data);
  }

  updateTopicType(id:number|string, data:any){
    return this.http.put(this.blogAPIUrl + `/TopicTypes/${id}`, data);
  }

  deleteTopicType(id:number|string){
    return this.http.delete(this.blogAPIUrl + `/TopicTypes/${id}`);
  }
  
  // --------------------------API CALLS FOR USERS ------------------------------------------------------------------------

  getUserList(): Observable<any[]> {
    return this.http.get<any>(this.blogAPIUrl + '/Users');
  }

  addUser(data:any){
    return this.http.post(this.blogAPIUrl + '/Users', data);
  }

  updateUser(id:number|string, data:any){
    return this.http.put(this.blogAPIUrl + `/Users/${id}`, data);
  }

  deleteUser(id:number|string){
    return this.http.delete(this.blogAPIUrl + `/Users/${id}`);
  }

  signUp(data:any){
    return this.http.post<any>(this.blogAPIUrl + `/Users/register`, data);
  }
  signOut(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.router.navigate(['login'])
    }
  }
  login(data: any){
    return this.http.post<any>(this.blogAPIUrl + `/Users/authenticate`, data);
  }

  storeToken(tokenValue: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenValue);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!this.getToken();
  }

}
