import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { MenuDish } from '../interfaces/restaurant';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orders: BehaviorSubject<MenuDish[]> = new BehaviorSubject([]);

  constructor() { }

  addToCart(dish: MenuDish) {

  }

  async finishOrder() {
    
  }
}
