import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../shared/services/restaurants.service';
import { Restaurant } from '../../interfaces/Restaurant';
import { Menu } from '../../interfaces/Menu';
import { CartItem } from '../../interfaces/CartItem';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-one-restaurant',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './one-restaurant.component.html',
  styleUrl: './one-restaurant.component.css'
})
export class OneRestaurantComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private restaurantsService: RestaurantsService,
    private cdr: ChangeDetectorRef,
private cartService:CartService

  ) { }

  id: number =0
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
        // Debug: Log first item to see its structure
        if (this.menuItems.length > 0) {
          console.log('First menu item structure:', this.menuItems[0])
          console.log('All menu items:', this.menuItems)
        }
        // Initialize quantities for all items
        // Use itemId if available, otherwise use index
        this.menuItems.forEach((item, index) => {
          const key = item.itemID !== undefined ? item.itemID : index
          this.itemQuantities[key] = 1
        })
        // Apply current sort after menu is loaded
        this.sortbyPrice()
      },
      error: (error) => {
        console.error('Error fetching menu:', error)
      }
    });
  }

  getItemKey(item: Menu, index: number): number {
    // Use itemId if available, otherwise use index
    return item.itemID !== undefined ? item.itemID : index
  }

  getItemQuantity(item: Menu, index: number): number {
    const key = this.getItemKey(item, index)
    return this.itemQuantities[key] || 1
  }

  increaseItems(item: Menu, index: number): void {
    const key = this.getItemKey(item, index)
    const currentQuantity = this.itemQuantities[key] || 1
    const newQuantity = currentQuantity + 1
    console.log(`Increasing item (key: ${key}) from ${currentQuantity} to ${newQuantity}`)
    // Create new object reference to trigger change detection
    this.itemQuantities = { ...this.itemQuantities, [key]: newQuantity }
    console.log('Updated quantities:', this.itemQuantities)
    this.cdr.detectChanges()
  }

  decreaseItems(item: Menu, index: number): void {
    const key = this.getItemKey(item, index)
    const currentQuantity = this.itemQuantities[key] || 1
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      console.log(`Decreasing item (key: ${key}) from ${currentQuantity} to ${newQuantity}`)
      // Create new object reference to trigger change detection
      this.itemQuantities = { ...this.itemQuantities, [key]: newQuantity }
      console.log('Updated quantities:', this.itemQuantities)
      this.cdr.detectChanges()
    } else {
      console.log(`Cannot decrease item (key: ${key}) below 1`)
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

  sortingType: string = " "

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

    // Save current quantities before sorting
    const currentQuantities = { ...this.itemQuantities }

    // Try API sorting first, fallback to client-side sorting
    this.restaurantsService.sortMenuByPrice(this.id, this.sortingType).subscribe({
      next: (data) => {
        this.menuItems = data
        // Preserve existing quantities and initialize new ones
        const newQuantities: { [key: number]: number } = {}
        this.menuItems.forEach((item, index) => {
          const key = item.itemID !== undefined ? item.itemID : index
          // Preserve existing quantity or initialize to 1
          newQuantities[key] = currentQuantities[key] || 1
        })
        this.itemQuantities = newQuantities
        this.cdr.detectChanges()
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
    // Save current quantities before sorting
    const currentQuantities = { ...this.itemQuantities }
    
    this.menuItems = [...this.menuItems].sort((a, b) => {
      const priceA = parseFloat(a.itemPrice?.toString() || '0')
      const priceB = parseFloat(b.itemPrice?.toString() || '0')
      
      if (this.sortingType === 'asc') {
        return priceA - priceB
      } else {
        return priceB - priceA
      }
    })
    
    // Preserve quantities after sorting
    const newQuantities: { [key: number]: number } = {}
    this.menuItems.forEach((item, index) => {
      const key = item.itemID !== undefined ? item.itemID : index
      newQuantities[key] = currentQuantities[key] || 1
    })
    this.itemQuantities = newQuantities
    this.cdr.detectChanges()
  }

  addToCart(item: Menu, index: number): void {
    const quantity = this.getItemQuantity(item, index)

    this.cartService.addToCart(item,quantity)
    localStorage.setItem('RestId',item.restaurantID?.toString()||'')
    console.log(item.restaurantID)
    // console.log(quantity)
  }

  ngOnInit() {
    // Initialize category from route params if available
    // this.category = this.route.snapshot.params['category'] || ''
    this.route.params.subscribe(params=>{
      this.id=+params['id']
      this.getOneRestaurant()
      // Load menu
      this.getMenu()

    })
  }


}