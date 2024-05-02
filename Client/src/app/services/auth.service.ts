import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly blogAPIUrl = "https://localhost:7111/api";

  private userPayload:any

  private tokenSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  loginChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private http: HttpClient,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { 
      if (isPlatformBrowser(this.platformId)) {
        this.userPayload = this.decodedToken();
        this.tokenSubject = new BehaviorSubject<string|null>(this.getToken());
      }
    }

  signUp(data:any){
    return this.http.post<any>(this.blogAPIUrl + `/Users/register`, data);
  }

  signOut(){
    localStorage.clear();
    this.tokenSubject.next(null);
    this.loginChanged.emit(false);
    if (isPlatformBrowser(this.platformId)) {
      
      console.log(localStorage.getItem('token'));
      this.router.navigate(['login'])
    }
  }

  login(data: any) {
    return this.http.post<any>(this.blogAPIUrl + `/Users/authenticate`, data)
      .pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            this.storeToken(response.token);
            this.userPayload = this.decodedToken();
            this.loginChanged.emit(true);
          }
        })
      );
  }

  storeToken(tokenValue: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenValue);
      this.tokenSubject.next(tokenValue);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }


  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  decodedToken() {
    if (isPlatformBrowser(this.platformId)) {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken();
      return jwtHelper.decodeToken(token!);
    }
    return null;
  }

  getUserNameFromToken() {
    if (isPlatformBrowser(this.platformId) && this.userPayload) {
      return this.userPayload.unique_name;
    }
    return null;
  }

  getRoleFromToken() {
    if (isPlatformBrowser(this.platformId) && this.userPayload) {
      return this.userPayload.role;
    }
    return null;
  }

  getUserIdFromToken() {
    //console.log(this.userPayload.userId)
    if (isPlatformBrowser(this.platformId) && this.userPayload) {
      return this.userPayload.nameid;
    }
    
    return null;    
  }

  getTokenObservable(): Observable<string|null> {
    return this.tokenSubject.asObservable();
  }

  isAdmin(){
    if (this.getRoleFromToken() === 'admin'){
      return true;
    }
    return false;
  }
}
