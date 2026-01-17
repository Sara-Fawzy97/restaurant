import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../interfaces/Restaurant';
import { Menu } from '../../interfaces/Menu';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private apiUrl = 'https://fakerestaurantapi.runasp.net/api/Restaurant'; // Adjust this to your actual API endpoint
  //                https://fakerestaurantapi.runasp.net/api/Restaurant?category=Parsi Cuisine
  constructor(private http: HttpClient) { }

  /**
   * Get all restaurants
   */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  // getRestaurantsByAddress():Observable<Restaurants[]>{

  // }
  /**
   * Get a restaurant by ID
   */
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  /*******get restaurNT  Menu* */
 
 getRestaurantMenu(id:number):Observable<Menu[]>{
  return this.http.get<Menu[]>(`${this.apiUrl}/${id}/menu`)
 }


 /****** Get restaurant by Categories*** */

 getRetaurantsCategories(category:any):Observable<Restaurant[]>
{ return this.http.get<Restaurant[]>(`${this.apiUrl}?category=${category}`)

} 

///5/menu?sortbyprice=desc
/*******sort menu by price*** */
sortMenuByPrice(id:number,sort:string):Observable<Menu[]>{
  return this.http.get<Menu[]>(`${this.apiUrl}/${id}/menu?sortbyprice=${sort}`)
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

