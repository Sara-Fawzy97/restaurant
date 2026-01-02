import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../shared/services/restaurants.service';
import { Restaurant } from '../../interfaces/Restaurant';
import { Menu } from '../../interfaces/Menu';

@Component({
  selector: 'app-one-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-restaurant.component.html',
  styleUrl: './one-restaurant.component.css'
})
export class OneRestaurantComponent implements OnInit {

  constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService) { }

  id: number = this.route.snapshot.params['id']
  restaurant: Restaurant = {}

  menuItems :Menu[]=[]
  loading: boolean = false;
  

  visible:boolean=true
    buttonClicked(){
      this.visible=false
    }

  getOneRestaurant(): void {
    this.loading = true;

    this.restaurantsService.getRestaurantById(this.id).subscribe({
      next: (data: any) => {
        this.restaurant = data
        console.log(this.restaurant)
      }
    });
  }

  getMenu():void {
    this.loading = true;

    this.restaurantsService.getRestaurantMenu(this.id).subscribe({
      next: (data) => {
        this.menuItems=data
        console.log(this.menuItems)
      }
    });
  }

  ngOnInit() {
    this.getOneRestaurant()
    this.getMenu()
  }

}


