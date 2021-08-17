import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.allRestaruants.subscribe(value => {
      if (value.length) {
        this.allRestaurants = [...value];
        this.filteredRestaurants = [...this.allRestaurants];
        this.filteredRestaurants[0].name = 'Novi restoran';
        console.log(this.allRestaurants[0].name);
        console.log('asd',this.filteredRestaurants[0].name);

        this.setImages();
      }
    });
  }

  setImages() {
    this.allRestaurants.forEach(r => {
      const random = Math.floor(Math.random() * 5) + 1;
      r.image = `url("assets/restorani/restoran${random}.jpg")`;
    });
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    this.filteredRestaurants = !query ? [...this.allRestaurants] : this.allRestaurants.filter(r => r.name.toLowerCase().includes(query));
  }

}
