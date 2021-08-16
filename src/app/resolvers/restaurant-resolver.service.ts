import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class RestaurantResolverService implements Resolve<boolean>  {

  constructor(private restaurantService: RestaurantService, private userSerice: UserService) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    if (this.userSerice.isCompany() !== 2) {
      return this.restaurantService.initRestaurantForCompanyUser();
    }
    else {
      return await this.restaurantService.initRestaurantsForCustomerUser().toPromise();
    }
  }
}
