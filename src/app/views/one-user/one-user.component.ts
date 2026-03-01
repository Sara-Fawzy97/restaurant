import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { CommonModule } from '@angular/common';
import { RestaurantsService } from '../../shared/services/restaurants.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-one-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './one-user.component.html',
  styleUrl: './one-user.component.css'
})
export class OneUserComponent implements OnInit {
      

  userKey:any=localStorage.getItem('UserCode')
  orders:any[]=[]

  constructor(private orderService:OrderService,private restaurantService:RestaurantsService){}
restID:number=0

restObject:any={}

  getOrders(){

    this.orderService.getAllOrders(this.userKey).subscribe({
      next:(data:any)=>{
        this.orders=data
        // console.log(this.orders)   
        this.orders.forEach(order => {
          if(!this.restObject[order.restaurantID]){
            this.restaurantService.getRestaurantById(order.restaurantID).subscribe({
              next:(data:any)=>{
                console.log(data)
                this.restObject[order.restaurantID]=data.restaurantName
                order.restaurantName=data.restaurantName
              }
             }
          )}else{
            order.restaurantName=this.restObject[order.restaurantID]
          }
          
        }); 
      // this.restID=
      // this.getRestautant()
      }
    })
  }

  ordersDetails:any

  getOrdersByID(orderId:number){
    this.orderService.getOrderById(orderId,this.userKey).subscribe({
      next:(data:any)=>{
        this.ordersDetails=data
        console.log(this.ordersDetails)
      }
    })
  }

  selectedOrderId:number|null=null
  toggleOrder(orderId:number){
        if(this.selectedOrderId===orderId){
           this.selectedOrderId= null
        }else {
            this.selectedOrderId=orderId;
        }
        this.getOrdersByID(orderId)

  }

  getRestautant(id:number){
     this.restaurantService.getRestaurantById(id).subscribe({
      next:(data:any)=>{
        console.log(data)
      }
     })
  }

  deleteMasterOrder(orderId:number){
    // console.log(this.orders[0].masterID)
    this.orderService.deleteMasterOrder(orderId,this.userKey).subscribe({
      next:(data:any)=>{
           this.orders=this.orders.filter((i: { masterID: number; }) =>i.masterID !==orderId)
      // console.log(data)
      }
    })
  }

  ngOnInit(): void {
    this.getOrders()
  this.getRestautant(this.restID)
  }
}
