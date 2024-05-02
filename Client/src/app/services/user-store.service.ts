import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  private userName$ = new BehaviorSubject<string>("");
  private userId$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  openComponent() {
    this.isOpenSubject.next(true);
  }

  closeComponent() {
    this.isOpenSubject.next(false);
  }

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

  //getter for userId
  public getUserIdFromStore(){
    return this.userId$.asObservable();
  }

}
