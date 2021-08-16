import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish, Extra } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  allDishes;

  allExtras = [];

  constructor() {
    this.dishes = new BehaviorSubject([]);
  }

  dishes: BehaviorSubject<Array<Dish>>;

  getDishById(id: number) {
    return this.allDishes.find((dish) => dish.id == id);
  }

  getAllExtras() {
    return this.allExtras;
  }

  setAllDishes(allDishes) {
    this.dishes.next(allDishes.map(d => ({
        id: d.DishId,
        name: d.Name,
        extras: this.allExtras.map(e => {
          if (d[e.Name]) {return +e.Id;}
          else {return null;}
        }).filter(e => e != null)
      })));
  }

  setAllExtras(allExtras) {
    this.allExtras = allExtras;
  }

  addNewDish(dish) {
    this.dishes.next(this.dishes.getValue().concat([{
      id: this.allDishes?.length ? this.allDishes?.length : 1,
      extras: dish.extras,
      description: dish.description,
      name: dish.name
    }]));
  }
}
