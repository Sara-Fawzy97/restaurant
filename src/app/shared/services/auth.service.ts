import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 url='https://fakerestaurantapi.runasp.net/api/User'
  constructor(private http:HttpClient) { }

  //get all users
 getAllUsers(){
    return this.http.get(this.url)
  }

  getUserKey(UserEmail:string,password:any){
    return this.http.get(this.url+'/getusercode?UserEmail='+UserEmail+'&Password='+password)

  }

//to add a new user
  registerUser(credentials:any){
    this.http.post(this.url+'/register',credentials)
  }



}
