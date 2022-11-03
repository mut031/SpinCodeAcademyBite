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
    private cartService: CartService,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.days = Days;
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.restaurant = this.restaurantService.getRestaurantById(params.id);
        this.orders = this.cartService.orders.getValue();
        this.showForDay();
        this.cartService.orders.subscribe(orders => this.orders = orders);
      }
    });
  }

  showForDay(dayId?: number) {
    this.activeDayId = dayId || this.activeDayId;
    this.dishesForDay = this.restaurant.menus[this.activeDayId - 1].map(dish => {
      dish.inCart = !!this.orders.find(o => o.day === dish.day && o.dishId === dish.dishId);
      return dish;
    });
  }

  addToCart(dish: MenuDish) {
    dish.inCart = this.cartService.toggleDishInCart(dish);
  }


  async showCart() {
    const modal = await this.modalCtrl.create({
      component: CartPage,
      componentProps: {
        modalPage: true
      }
    });
    await modal.present();
    await modal.onWillDismiss();
    if (!this.orders.length) {
      this.showForDay();
    }
  }
}
