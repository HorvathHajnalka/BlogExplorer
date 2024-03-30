import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; 



@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  readonly blogAPIUrl = "https://localhost:7111/api";

  constructor(private http:HttpClient) { }

  getTopicList():Observable<any[]>{
    return this.http.get<any>(this.blogAPIUrl + '/topics');
  }
}
