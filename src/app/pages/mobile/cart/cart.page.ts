import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MenuDish } from 'src/app/interfaces/restaurant';
import { CartService } from 'src/app/services/cart.service';

enum Days {
  mon,
  tue,
  wed,
  thu,
  fri
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orders: MenuDish[];
  days: typeof Days;

  constructor(private cartService: CartService, private toastController: ToastController) { }

  ngOnInit() {
    this.cartService.orders.subscribe(orders => this.orders = orders.sort((a,b) => a.day - b.day));
    this.days = Days;
  }

  async finishOrder() {
    await this.cartService.finishOrder();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Order confirmed!',
      duration: 2000,
      color: 'primary'
    })
    toast.present();
  }

}
