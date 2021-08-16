import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private restaurantService: RestaurantService) {
    this.restaurantService.allOrders.subscribe((orders) => {
      this.orders = orders;
    });
  }

  orders;
  days = [1, 2, 3, 4, 5];
  daysNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  daysNamesCRO = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'];
  ngOnInit() {
  }

  currentDay = 1;
  changeDay(day: number) {
    this.currentDay = day;
    this.restaurantService.changeDay(this.currentDay);
  }

  getOrdersForDay() {
    return this.orders.filter(o => o.dan == this.daysNamesCRO[this.currentDay-1]);
  }
}
