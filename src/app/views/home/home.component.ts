import { Component,OnInit } from '@angular/core';
import { RouterLink,Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../interfaces/Restaurant';
import { FormsModule } from '@angular/forms';

import {RestaurantsService} from '../../shared/services/restaurants.service';
// import { Router } from 'express';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 
})
export class HomeComponent {

addresses:any[]=[]
addressesArray:any
splitedAdresses:any[]=[]
uniuqeAddresses:any[]=[]
restaurants:Restaurant[]=[]
oneRestaurant=[]
  constructor(private restaurantsService:RestaurantsService, private router:Router){}

ngOnInit():void{
  this.loadAdresses();
}

///////////////load all adresses in selector 
  loadAdresses():void{
    this.restaurantsService.getRestaurants().subscribe({
      next:(data)=>{
        this.restaurants=data
        this.addresses=data.map(item => item.address);
        console.log(data)
        for (let x in this.addresses) {
          this.addressesArray= this.addresses[x].split(',')[0]
          this.splitedAdresses.push(this.addressesArray)
          // console.log(this.splitedAdresses)
        }
this.uniuqeAddresses=this.splitedAdresses.filter((value,index,array)=>{
  return array.indexOf(value)===index
})
 console.log(this.uniuqeAddresses)

      }
    })
  }


  /////////search by city and name
searchByaddressAndName(data:any):void{

  this.restaurantsService.getRestaurantByCity(data.country,data.restaName).subscribe({
    next:(res)=>{
      this.restaurants=res
      console.log(this.restaurants[0].restaurantID)
      this.router.navigate(['/restaurant',this.restaurants[0].restaurantID,this.restaurants[0].type])
    }
  })
  console.log(data)
}


}
