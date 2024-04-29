import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private userName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  // getter for role
  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  // setter for role
  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  // getter for username
  public getUserNameFromStore(){
    return this.userName$.asObservable();
  }

  // setter for username
  public setUserNameForStore(userName:string){
    this.userName$.next(userName);
  }

}
