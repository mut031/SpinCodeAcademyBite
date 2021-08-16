import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RestaurantService } from '../../services/restaurant.service';


@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) {
    this.restaurantService.currentDayMenuForRestaurant.subscribe((menu) => {
      this.menu = menu;
    });
  }
  menu;

  fun() {
    console.log(this.day);
  }

  @Input() day;


  ngOnInit() {
    console.log(this.day);
  }

  removeDishFromMenu(dishId: number) {
    this.restaurantService.removeDishFromMenu(dishId);
  }
}
