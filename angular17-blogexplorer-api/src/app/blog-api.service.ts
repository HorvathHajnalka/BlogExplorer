import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  readonly blogAPIUrl = "https://localhost:7111/api";

  constructor(private http:HttpClient) { }

  getTopicList():Observable<any[]>{
    console.log(this.http.get<any>(this.blogAPIUrl + '/Topics'));
    return this.http.get<any>(this.blogAPIUrl + '/Topics');
  }
}
