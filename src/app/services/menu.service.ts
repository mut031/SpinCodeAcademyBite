import { Injectable } from '@angular/core';



import { BehaviorSubject } from 'rxjs';
import { Day, Dish } from '../interfaces/menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {
    this.currentDayMenuForRestaurant = new BehaviorSubject(this.getDayMenu());
  }

  getDayMenu(): Day {
    return this._menus.find((menu) => menu.id == this.currentDay);
  }

  currentDayMenuForRestaurant: BehaviorSubject<Day>;

  changeDay(day: number) {
    this.currentDay = day;
    this.currentDayMenuForRestaurant.next(this.getDayMenu());
  }
  currentDay = 1;
  _menus = [{
    name: 'pon',
    id: 1,
    dishes: []
  }, {
    name: 'pon',
    id: 2,
    dishes: []
  }, {
    name: 'uto',
    id: 3,
    dishes: []
  }, {
    name: 'pon',
    id: 4,
    dishes: []
  }, {
    name: 'pon',
    id: 5,
    dishes: []
  }];

  addDishToMenu(newDish: Dish) {
    this._menus = this._menus.map((menu) => {
      if (menu.id == this.currentDay && (menu.dishes.find((dish) => dish.id == newDish.id) === undefined)) {
        menu.dishes.push(newDish);
        return menu;
      }
      return menu;
    });
  }
}
