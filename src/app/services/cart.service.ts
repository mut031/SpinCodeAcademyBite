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

  constructor(private storageService: StorageService, private apiService: ApiService, private userService: UserService) { }

  toggleDishInCart(dish: MenuDish): boolean {
    const x: MenuDish = Object.assign({}, dish);
    const orders = this.orders.getValue();
    const index = orders.findIndex(o => o.dishId === dish.dishId && o.day === dish.day && o.companyId === dish.companyId);
    if (index === -1) {
      delete x.inCart;
      orders.push(x);
    }
    else {
      orders.splice(index, 1)
    }
    this.orders.next(orders);
    this.storageService.setData('cart', orders);
    return index === -1;
  }

  async finishOrder() {
    const order = this.orders.getValue()[0];
    await this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spOrder',
            params: {
              dishid: order.dishId,
              day: order.day,
              userid: this.userService.getUser().userId
            }
          }
        ]
      }
    ).toPromise();
    this.orders.next([]);
    this.storageService.removeData('cart');
  }
}
