import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuDish, Restaurant } from '../interfaces/restaurant';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { DishService } from './dish.service';
import { Day, Dish } from '../interfaces/menu';
import { map } from 'rxjs/operators';



interface MenuFromApiInterface {
  day: number;
  companyId: number;
  name: string;
}

interface DishFromApiInterface {

}

interface ExtrasFromApiInterface {
  id: number;
  name: string;
}

interface OrdersFromApiInterface {
  dan: string;
  restoranid: number;
  restoran: string;
  userrestoranuid: number;
  jelo: string;
  soup: boolean;
  Salad: boolean;
  bread: boolean;
  narucitelj: string;
  firma: string;
  firmaid: number;
  naruciteljid: number;
}

interface OrdersInterface {
  dan: string;
  restoranid: number;
  restoran: string;
  userrestoranuid: number;
  jelo: string;
  soup: boolean;
  Salad: boolean;
  bread: boolean;
  narucitelj: string;
  firma: string;
  firmaid: number;
  naruciteljid: number;
  finished: boolean;
  delivered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurant = {
    id: 0,
    name: '',
    menu: []
  };
  currentDay = 1;

  currentDayMenuForRestaurant: BehaviorSubject<Day> = new BehaviorSubject(null);
  allRestaruants: BehaviorSubject<Restaurant[]> = new BehaviorSubject([]);
  allOrders: BehaviorSubject<OrdersInterface[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService, private userService: UserService, private dishService: DishService) { }

  getRestaurantById(id: string) {
    return this.allRestaruants.getValue().find(r => r.companyId.toString() === id);
  }

  getDayMenu(): Day {
    return this.restaurant.menu[this.currentDay];
  }


  changeDay(day: number) {
    this.currentDay = day;
    this.currentDayMenuForRestaurant.next(this.getDayMenu());
  }

  addDishToMenu(newDish: Dish) {
    this.insertDishInMenuForCompany(newDish.id, this.userService.getUser().userId, this.currentDay).subscribe((res) => {
      this.restaurant.menu[this.currentDay].push(newDish);
    }, (err) => {
      alert("The dish is already on the menu for this day!")
    });
  }

  removeDishFromMenu(dishId: number) {
    this.deleteDishInMenuForCompany(dishId, this.userService.getUser().userId, this.currentDay).subscribe((res) => {
      this.restaurant.menu[this.currentDay] = this.restaurant.menu[this.currentDay].filter(d => d.id !== dishId);
      this.currentDayMenuForRestaurant.next(this.getDayMenu());
    }, (err) => {
      alert("ERROR!")
    });
  }

  // dohvaca restoran i sve njegove menije: ime restorana, slika, description, sva jela, meni za trenutni tjedan
  initRestaurantForCompanyUser() {
    this.restaurant.id = this.userService.getUsersRestaurantId();
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          // menu for restaurant
          {
            query: 'spMenu',
            params: {
              action: 'week',
              companyid: this.userService.getUsersRestaurantId()
            },
            tablename: 'weekMenu'
          },
          // all company dishes
          {
            query: 'spDishMenu',
            params: {
              action: 'dish',
              companyid: this.userService.getUsersRestaurantId()
            },
            tablename: 'allDishes'
          },
          //all extras
          {
            query: 'spDishMenu',
            params: {
              action: 'allExtras'
            },
            tablename: 'allExtras'
          },
          //all orders
          {
            query: 'spOrdersQuery',
            params: {
              action: 'forCompany',
              restoranid: this.userService.getUsersRestaurantId()
            },
            tablename: 'allOrders'
          }
        ]
      }
    ).subscribe((val: {
      weekMenu: Array<MenuFromApiInterface>;
      allDishes: Array<DishFromApiInterface>;
      allExtras: Array<ExtrasFromApiInterface>;
      allOrders: Array<OrdersFromApiInterface>;
    }) => {
      this.dishService.setAllExtras(val.allExtras);
      this.dishService.setAllDishes(val.allDishes);
      this.allOrders.next(val.allOrders.map(o => ({ ...o, finished: false, delivered: false })));
      let ids = 1;
      for (let i = 1; i < 6; i++) {
        const dishesForThisDay = val.weekMenu.filter(d => d.day === i).map(d => ({
          id: this.dishService.dishes.getValue().find(dish => dish.name == d.name).id,
          name: d.name,
          extras: []
        }));
        this.restaurant.menu[i] = dishesForThisDay;
      }
      this.currentDayMenuForRestaurant.next(this.restaurant.menu[this.currentDay]);
      return true;
    });
  }

  // dohvaca sve restorane: id, ime, slika, ocjena, description
  initRestaurantsForCustomerUser() {
    // this.restaurant.id = this.userService.getUsersRestaurantId();
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spCompany',
            params: {
              action: 'all'
            },
            tablename: 'allRestaurants'
          },
          {
            query: 'spMenu',
            params: {
              action: 'all'
            },
            tablename: 'allMenus'
          }
        ]
      }
    )
    .pipe(map((val: {
      allRestaurants: Restaurant[];
      allMenus: MenuDish[];
    }) => {
      if (val.allRestaurants.length > 0) {
        const x = val.allRestaurants.map(r => ({
          companyId: r.companyId,
          name: r.name,
          menus: [1, 2, 3, 4, 5].map(d => val.allMenus.filter(m => m.companyId === r.companyId && m.day === d))
        }));
        this.allRestaruants.next(x);
      }
    }));
  }


  insertDishInMenuForCompany(dishId: number, userId: number, day: number) {
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spMenuAzur',
            params: {
              action: 'insert',
              dishid: dishId,
              day: day,
              userid: userId
            }
          }
        ]
      }
    );
  }

  deleteDishInMenuForCompany(dishId: number, userId: number, day: number) {
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spMenuAzur',
            params: {
              action: 'delete',
              dishid: dishId,
              day: day,
              userid: userId
            }
          }
        ]
      }
    );
  }

  addDishToRestaurant(newDish: {
    name: string;
    description: string,
    soup: boolean;
    salad: boolean;
    bread: boolean;
    extras: Array<number>;
  }) {
    return this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food',
      {
        db: 'Food',
        queries: [
          {
            query: 'spDishAzur',
            params: {
              action: 'insert',
              companyid: this.userService.getUsersRestaurantId(),
              name: newDish.name,
              description: newDish.description,
              soup: newDish.soup,
              salad: newDish.salad,
              bread: newDish.bread,
              userid: this.userService.getUser().userId
            }
          }
        ]
      }
    ).subscribe((val) => {
      this.dishService.addNewDish(newDish);
    });
  }
}
