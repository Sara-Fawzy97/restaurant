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
  category: string = ''
  restaurants: Restaurant[] = []
  menuItems: Menu[] = []
  itemQuantities: { [key: number]: number } = {} // Track quantity per item
  
  visible: boolean = true
  
  buttonClicked() {
    this.visible = false
  }

  getOneRestaurant(): void {
    this.restaurantsService.getRestaurantById(this.id).subscribe({
      next: (data: any) => {
        this.restaurant = data
        this.category = this.restaurant.type || ''
        // Get related restaurants after category is set
        if (this.category) {
          this.getRelatedRestaurants()
        }
        console.log(this.restaurant.type)
      },
      error: (error) => {
        console.error('Error fetching restaurant:', error)
      }
    });
  }

  getMenu(): void {
    this.restaurantsService.getRestaurantMenu(this.id).subscribe({
      next: (data) => {
        this.menuItems = data
        // Initialize quantities for all items
        this.menuItems.forEach(item => {
          if (item.itemId !== undefined) {
            this.itemQuantities[item.itemId] = 1
          }
        })
        // Apply current sort after menu is loaded
        this.sortbyPrice()
        console.log(this.menuItems)
      },
      error: (error) => {
        console.error('Error fetching menu:', error)
      }
    });
  }

  getItemQuantity(itemId: number | undefined): number {
    if (itemId === undefined) return 1
    return this.itemQuantities[itemId] || 1
  }

  increaseItems(itemId: number | undefined): void {
    if (itemId === undefined) return
    if (!this.itemQuantities[itemId]) {
      this.itemQuantities[itemId] = 1
    }
    this.itemQuantities[itemId]++
  }

  decreaseItems(itemId: number | undefined): void {
    if (itemId === undefined) return
    if (!this.itemQuantities[itemId]) {
      this.itemQuantities[itemId] = 1
    }
    if (this.itemQuantities[itemId] > 1) {
      this.itemQuantities[itemId]--
    }
  }
  
  getRelatedRestaurants(): void {
    if (!this.category) {
      console.warn('Category not available yet')
      return
    }
    
    this.restaurantsService.getRetaurantsCategories(this.category).subscribe({
      next: (data) => {
        // Filter out current restaurant from related restaurants
        this.restaurants = data.filter(r => r.restaurantID !== this.id)
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching related restaurants:', error)
      }
    })
  }

  sortingType: string = "asc"

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value
    if (value && value !== 'Sort menu by') {
      this.sortingType = value
      this.sortbyPrice()
    }
  }

  sortbyPrice(): void {
    if (!this.menuItems || this.menuItems.length === 0) {
      return
    }

    // Try API sorting first, fallback to client-side sorting
    this.restaurantsService.sortMenuByPrice(this.id, this.sortingType).subscribe({
      next: (data) => {
        this.menuItems = data
        // Re-initialize quantities for sorted items
        this.menuItems.forEach(item => {
          if (item.itemId !== undefined && !this.itemQuantities[item.itemId]) {
            this.itemQuantities[item.itemId] = 1
          }
        })
        console.log('Sorted menu:', data)
      },
      error: (error) => {
        console.error('Error sorting menu via API, using client-side sort:', error)
        // Fallback to client-side sorting
        this.sortMenuClientSide()
      }
    })
  }

  sortMenuClientSide(): void {
    this.menuItems = [...this.menuItems].sort((a, b) => {
      const priceA = parseFloat(a.itemPrice?.toString() || '0')
      const priceB = parseFloat(b.itemPrice?.toString() || '0')
      
      if (this.sortingType === 'asc') {
        return priceA - priceB
      } else {
        return priceB - priceA
      }
    })
  }

  ngOnInit() {
    // Initialize category from route params if available
    this.category = this.route.snapshot.params['category'] || ''
    
    // Load restaurant data first
    this.getOneRestaurant()
    // Load menu
    this.getMenu()
    // Related restaurants will be loaded after restaurant data is fetched
  }


}