import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from '../../interfaces/CartItem';
import { Menu } from '../../interfaces/Menu';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
 public cartItems: CartItem[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Load cart from localStorage if available
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        // this.cartItems=JSON.parse(savedCart)
        this.cartSubject.next(JSON.parse(savedCart));
      }
    }
    this.cart$.subscribe(items => this.cartItems = items);

  }

  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }
// cartItems:CartItem[]=[]

   addToCart(menuItem: Menu, quantityAdded:number): void {
    // const cart = this.cartSubject.value;
    const existingItem = this.cartItems.find(i => i.item.itemID === menuItem.itemID);
   console.log("existingItem",existingItem)
   console.log('menuItem',menuItem)
    if (existingItem) {
      existingItem.quantity += quantityAdded;
      // existingItem.totalPrice = existingItem.quantity * (existingItem.item.itemPrice || 0);
    } else {
      // const newItem = { ...menuItem };
      // newItem.quantity = menuItem.quantity || 1;
      // newItem.totalPrice = newItem.quantity * (newItem.itemPrice || 0);
      this.cartItems.push(  
        { item:{...menuItem},
        quantity: quantityAdded,
totalPrice:quantityAdded*(menuItem.itemPrice||0)});
    }

    this.getTotalPrice()

    this.saveCartToLocalStorage();
  }
  removeFromCart(itemId: number): void {
    const cart = this.cartSubject.value.filter(item => item.item.itemID !== itemId);
    this.cartSubject.next(cart);
    this.saveCartToLocalStorage();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.find(i => i.item.itemID === itemId);
    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.quantity * (item.item.itemPrice || 0);
      this.cartSubject.next([...cart]);
      this.saveCartToLocalStorage();
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCartToLocalStorage();
  }
  // مسح السلة
  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }

  getTotalItems(): number {
    return this.cartSubject.value.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) => total + (item.totalPrice || 0), 0);
  }

  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartSubject.value ));

    }
  }
}
