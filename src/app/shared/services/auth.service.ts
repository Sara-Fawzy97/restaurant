import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/user';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isloggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isloggedInSubject.asObservable();

  hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('Token');
    }
    return false;
  }

  //get all users
 getAllUsers(){
    return this.http.get(this.apiUrl)
  }

  //get user code by email and password
  login(UserEmail:any,password:any){
this.isloggedInSubject.next(true)
    return this.http.get(this.apiUrl+'/getusercode?UserEmail='+UserEmail+'&Password='+password)

  }

//to add a new user
  registerUser(credentials:any){
this.isloggedInSubject.next(true)

   return this.http.post(this.apiUrl+'/register',credentials)
  
  }

  logOut(){
    this.isloggedInSubject.next(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('Token');
    }
  }
}
