import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { CartItem } from '../../interfaces/CartItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      // Filter out any invalid items before displaying
      this.cartItems = items.filter(item => item && item.item && item.item.itemID !== undefined);
      this.recalculateTotals();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  increaseQuantity(item: CartItem): void {
    if (!item || !item.item || item.item.itemID === undefined) {
      return;
    }
    const newQuantity = item.quantity + 1;
    this.cartService.updateQuantity(item.item.itemID, newQuantity);
  }

  decreaseQuantity(item: CartItem): void {
    if (!item || !item.item || item.item.itemID === undefined) {
      return;
    }
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.cartService.updateQuantity(item.item.itemID, newQuantity);
    }
  }

  removeItem(item: CartItem): void {
    if (!item || !item.item || item.item.itemID === undefined) {
      return;
    }
    this.cartService.removeFromCart(item.item.itemID);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  private recalculateTotals(): void {
    this.totalItems = this.cartService.getTotalItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

}
