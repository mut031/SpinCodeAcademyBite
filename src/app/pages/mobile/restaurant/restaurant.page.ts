import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActionSheetController } from '@ionic/angular';
import { CartService } from '../../../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';
import { MenuDish, Restaurant } from 'src/app/interfaces/restaurant';

enum Days {
  mon,
  tue,
  wed,
  thu,
  fri
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  days: typeof Days;
  restaurant: Restaurant;
  activeDayId = 1;
  dishesForDay: MenuDish[];
  orders: MenuDish[];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.days = Days;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.restaurant = this.restaurantService.getRestaurantById(params.id);
        this.showForDay();
      }
    });
  }

  showForDay(dayId?: number) {
    this.activeDayId = dayId || this.activeDayId;
    this.dishesForDay = this.restaurant.menus[this.activeDayId - 1];
  }

}
