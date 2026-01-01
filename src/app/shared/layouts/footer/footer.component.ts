import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Restaurant } from '../../../interfaces/Restaurant';
import { RestaurantsService } from '../../services/restaurants.service';
// import { nextTick } from 'process';
// import { NgForOf } from "@angular/common/index";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
    this.getRestaurantsCategories()
  }
  categories: any[] = []
  uniqueCategories: any
  cities: any
  citiesArray: any[] = []
  splitedCities: any[] = []
  uniqeCities: any
  getRestaurantsCategories() {

    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.categories = data.map(item => item.type)
        this.uniqueCategories = this.categories.filter((value, index, array) => {
          return array.indexOf(value) === index
        })
        // console.log(this.uniqueCategories)

        this.cities = data.map(item => item.address)
        for (let x in this.cities) {
          this.citiesArray = this.cities[x].split(',')[0]
          this.splitedCities.push(this.citiesArray)
          // console.log(this.splitedArray)
        }

        // console.log(data.map(item => item.type))
        // console.log(this.splitedCities)
        this.uniqeCities = this.splitedCities.filter((value, index, array) => {
          return array.indexOf(value) === index
        })
        // console.log(this.uniqeCities)
      }
    })



  }


}
