import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  items = [];
  constructor() { 
    this.items = !!window.localStorage['CH']? JSON.parse(window.localStorage['CH']) : [];
  }

  addToCart(product) {
    this.items.push(product);
    this.saveCart();
  }

  removeAt(idx) {
    this.items.splice(idx, 1);
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    window.localStorage['CH'] = [];
    return this.items;
  }

  saveCart() {
    window.localStorage['CH'] = JSON.stringify(this.items);
  }
}