import { Component,OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../interfaces/Restaurant';

import {RestaurantsService} from '../../shared/services/restaurants.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 
})
export class HomeComponent {

addresses:any[]=[]
addressesArray:any
splitedAdresses:any[]=[]
uniuqeAddresses:any[]=[]
  constructor(private restaurantsService:RestaurantsService){}

ngOnInit():void{
  this.loadAdresses();
}

  loadAdresses():void{
    this.restaurantsService.getRestaurants().subscribe({
      next:(data)=>{
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
}
