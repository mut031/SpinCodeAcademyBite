import { Component, Input, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Order, OrdersInterface } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor(private dishService: DishService, private orderService: OrderService) {
    this.extras = this.dishService.getAllExtras();

  }

  @Input() order: OrdersInterface;
  dish;
  extras;

  ngOnInit() {
  //  this.dish = this.dishService.getDishById(this.order.dishId)
    console.log(this.order);
  }

  // getExtraById(id: number) {
  //   return this.extras.find((extra) => extra.id == id)
  // }

  finishOrder() {
    this.order.finished = !this.order.finished;
  //  this.orderService.finishOrder(this.order.id);
  }

  deliverOrder() {
    this.order.delivered = !this.order.delivered;
  //  this.orderService.finishOrder(this.order.id);
  }
}
