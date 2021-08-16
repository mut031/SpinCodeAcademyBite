import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _allOrders = [{
    id: 1,
    customerId: 1,
    dishId: 1,
    extras: [1],
    finished: false
  }, {
    id: 2,
    customerId: 1,
    dishId: 1,
    extras: [1],
    finished: false
  }, {
    id: 3,
    customerId: 1,
    dishId: 1,
    extras: [1],
    finished: false
  }, {
    id: 4,
    customerId: 1,
    dishId: 1,
    extras: [1],
    finished: false
  }];

  constructor(private apiService: ApiService) {
    this.allOrders = new BehaviorSubject(this._allOrders);
  }


  allOrders: BehaviorSubject<Array<Order>>;

  finishOrder(id: number) {
    this._allOrders.map((order) => {
      if (order.id == id) {
        order.finished = true;
      }
      return order;
    });
  }

  getUserOrders(userId: number) {
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spOrdersQuery',
            params: {
              action: 'forUser',
              userId
            }
          }
        ]
      }
    );
  }

}
