import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() { }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addItem(product: CartItem): void {
    const cart = this.getCart();
    const newItem: CartItem = { ...product, itemId: Date.now().toString() };
    cart.push(newItem);
    this.saveCart(cart);
  }
  removeItem(itemId: string): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.itemId !== itemId);
    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
