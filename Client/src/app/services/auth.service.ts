import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly blogAPIUrl = "https://localhost:7111/api";

  private userPayload:any

  constructor(private http: HttpClient,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { 
      this.userPayload = this.decodedToken();
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

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getUserNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
