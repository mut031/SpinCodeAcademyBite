import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { DishService } from '../../../services/dish.service';
import { RestaurantService } from '../../../services/restaurant.service';
import { Day } from '../../../interfaces/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  allDishes;
  constructor(private menuService: MenuService, private dishService: DishService, private restaurantService: RestaurantService) {
    this.dishService.dishes.subscribe((dishes) => {
      this.allDishes = dishes;
    });
    this.restaurantService.currentDayMenuForRestaurant.subscribe((dayMenu:Day) => {
      this.dayMenu = dayMenu;
      console.log(this.dayMenu)
    })
  }

  days = [1, 2, 3, 4, 5];
  daysNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  dayMenu: Day;

  ngOnInit() {
  }

  currentDay = 1;
  changeDay(day: number) {
    this.currentDay = day;
    this.restaurantService.changeDay(this.currentDay);
  }

  saveMenu() {}
}
