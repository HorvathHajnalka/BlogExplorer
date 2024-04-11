import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Marks the class as one that participates in the dependency injection system.
// The providedIn: 'root' metadata option means that the BlogApiService is available throughout the application.
@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  // The base URL of the blog API.
  readonly blogAPIUrl = "https://localhost:7111/api";

  // Injecting the HttpClient service into this service, enabling HTTP requests.
  constructor(private http: HttpClient) { }

  // Retrieves a list of topics from the blog API.
  // Returns an Observable of any type (should ideally be typed to a model/interface representing a topic).
  getTopicList(): Observable<any[]> {
    // Debugging line, logs the Observable to the console (might not display expected data directly, since Observables are lazy).
    console.log(this.http.get<any>(this.blogAPIUrl + '/Topics'));

    // Makes a GET request to the specified URL and returns the Observable.
    // This Observable will emit the data once the HTTP request is successfully completed.
    return this.http.get<any>(this.blogAPIUrl + '/Topics');
  }
}
