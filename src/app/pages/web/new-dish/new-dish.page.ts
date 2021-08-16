import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../interfaces/menu';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  constructor(private dishService: DishService, private restaurantService: RestaurantService) {
    this.dish = {
      id: 0,
      name: '',
      description: '',
      extras: []
    };
   }

  extras = [{
    id:1,
    name: 'kruh',
    checked: false
  },
  {
    id:2,
    name: 'salata',
    checked: false
  },
  {
    id:3,
    name: 'juha',
    checked: false
  },
  {
    id:4,
    name: 'pribor',
    checked: false
  }];

  ngOnInit() {}

  dish: Dish;

  addNewDish() {
    this.restaurantService.addDishToRestaurant({name: this.dish.name, description: this.dish.description, salad: this.extras.find(e => e.name == 'salata').checked,
    soup: this.extras.find(e => e.name == 'juha').checked, bread: this.extras.find(e => e.name == 'kruh').checked, extras: [...this.extras.filter((e) => e.checked).map(e => e.id)]});
    this.dish = {
      id: 0,
      name: '',
      description: '',
      extras: []
    }
    this.extras = this.extras.map(e => {
      e.checked = false
      return e;
    })
  }

  cancelNewDish() {
    this.dish = {
      id: 0,
      name: '',
      description: '',
      extras: []
    }
    this.extras = this.extras.map(e => {
      e.checked = false
      return e;
    })
  }
}
