import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurant {
  restaurantID?: number;
  restaurantName: string;
  address?: string;
  type?: string;
  parkingLot?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private apiUrl = 'https://fakerestaurantapi.runasp.net/api/Restaurant'; // Adjust this to your actual API endpoint

  constructor(private http: HttpClient) { }

  /**
   * Get all restaurants
   */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  /**
   * Get a restaurant by ID
   */
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new restaurant
   */
  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  /**
   * Update an existing restaurant
   */
  updateRestaurant(id: number, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, restaurant);
  }

  /**
   * Delete a restaurant
   */
  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

