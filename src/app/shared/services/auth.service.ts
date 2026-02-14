import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/User'; // شيلنا الجزء بتاع https...

//  url='https://fakerestaurantapi.runasp.net/api/User'
  constructor(private http:HttpClient) { }

  //get all users
 getAllUsers(){
    return this.http.get(this.apiUrl)
  }

  //get user code by email and password
  login(UserEmail:any,password:any){
    return this.http.get(this.apiUrl+'/getusercode?UserEmail='+UserEmail+'&Password='+password)

  }

//to add a new user
  registerUser(credentials:any){
   return this.http.post(this.apiUrl+'/register',credentials)
  }



}
