import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../shared/services/restaurants.service';
import { Restaurant } from '../../interfaces/Restaurant';
import { Menu } from '../../interfaces/Menu';

@Component({
  selector: 'app-one-restaurant',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './one-restaurant.component.html',
  styleUrl: './one-restaurant.component.css'
})
export class OneRestaurantComponent implements OnInit {

  constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService) { }

  id: number = this.route.snapshot.params['id']
  restaurant: Restaurant = {}
  category:any=this.route.snapshot.params['category']
  restaurants:Restaurant[]=[]
  menuItems :Menu[]=[]
  sort:any
  // loading: boolean = false;
  

  visible:boolean=true
    buttonClicked(){
      this.visible=false
    }

  getOneRestaurant(): void {
    // this.loading = true;

    this.restaurantsService.getRestaurantById(this.id).subscribe({
      next: (data: any) => {
        this.restaurant = data
        this.category =this.restaurant.type
        console.log(this.restaurant.type)
      }
    });
  }

  getMenu():void {
    // this.loading = true;

    this.restaurantsService.getRestaurantMenu(this.id).subscribe({
      next: (data) => {
        this.menuItems=data
        console.log(this.menuItems)
      }
    });
  }

  num:number=1
  increaseItems(){
    this.num++
  }
  decreaseItems(){
    this.num--
  }
  
  getRelatedRestaurants():void{
    this.restaurantsService.getRetaurantsCategories(this.category).subscribe({
      next:(data)=>{
        this.restaurants=data
        console.log(data)
      }
    })

  }

  sortingType:string="asc"

  onSortChange(event:Event){
const value= (event.target as HTMLSelectElement).value
this.sortingType=value
this.sortbyPrice()
  }
  sortbyPrice():void{
    this.restaurantsService.sortMenuByPrice(this.id,this.sortingType).subscribe({
      next:(data)=>{
        this.menuItems=data
      console.log(data)
      }
    })
  }

  ngOnInit() {
    this.getOneRestaurant()
    this.getMenu()
    this.getRelatedRestaurants()
    this.sortbyPrice()

}


}