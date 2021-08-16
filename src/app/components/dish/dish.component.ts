import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {

  @Input() dish;
  @Input() active;
  constructor(private menuService: MenuService, private restaurantService: RestaurantService) { }
  extras = [{
    id: 1,
    name: 'kruh',
    checked: false
  },
  {
    id: 2,
    name: 'salata',
    checked: false
  },
  {
    id: 3,
    name: 'juha',
    checked: false
  },
  {
    id: 4,
    name: 'pribor',
    checked: false
  }];

  addToMenu() {
    if(!this.active)
      this.restaurantService.addDishToMenu(this.dish);
  }

  removeFromMenu(event: Event) {
    event.stopPropagation()
    this.restaurantService.removeDishFromMenu(this.dish.id);
  }

  ngOnInit() {
    this.extras = this.extras.map(e => {
      if(this.dish.extras.includes(e.id))
        {e.checked = true;}
      return e;
    });
  }

}
