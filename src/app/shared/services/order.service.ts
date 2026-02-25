import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/order';

  constructor(private http: HttpClient) { }

  /**
   * Get all orders
   */
  getAllOrders(code:any): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl+"?apikey="+code);
  }

  /**
   * Get an order by ID
   */
  getOrderById(id: number,code:any): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}/?apikey=${code}`);
  }

  /**
   * Get orders by user ID
   */
//   getOrdersByUserId(userId: number): Observable<Order[]> {
//     return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
//   }

  /**
   * Get orders by restaurant ID
   */
//   getOrdersByRestaurantId(restaurantId: number): Observable<Order[]> {
//     return this.http.get<Order[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
//   }

  /**
   * Create a new order
   */
  makeOrder(restId:number,code:number,items:any[]) {
    const order={
        menuDTO:items
    }
    return this.http.post<Order>(`${this.apiUrl}/${restId}/makeorder?apikey=${code}`,order);
  }

 
  /**
   * Delete an master order
   */
  ///Order/master/{master ID}?apikey={api key}
  deleteMasterOrder(masterId: number,code:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/master/${masterId}/?apikey=${code}`);
  }


  //delete  single order
  ///{order ID}?apikey={api key}
  deleteOrderById(orderId:number,code:number){
return this.http.delete(`${this.apiUrl}/${orderId}/?apikey=${code}`)
  }
}

