import { Component,OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

import {RestaurantsService,Restaurant} from '../../shared/services/restaurants.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 
})
export class HomeComponent {

addresses:Restaurant[]=[]
  constructor(private restaurantsService:RestaurantsService){}

ngOnInit():void{
  this.loadAdresses();
}

  loadAdresses():void{
    this.restaurantsService.getRestaurants().subscribe({
      next:(data)=>{
        this.addresses=data;
        // console.log(data.address)
      }
    })
  }
}
