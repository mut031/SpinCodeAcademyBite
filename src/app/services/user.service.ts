import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isMobile: boolean;

  constructor(private apiService: ApiService, private router: Router, private storage: StorageService, private platform: Platform) { }

  getUser() {
    return this.user !== undefined ? this.user : null;
  }

  isCompany() {
    return this.user?.companyId;
  }

  getUsersRestaurantId(): number {
    return this.user?.companyId;
  }

  login(email: string, password: string) {
    this.apiService.callApi('https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food', {
      db: 'Food',
      queries: [
        {
          query: 'spUsersAzur',
          params: {
            action: 'login',
            email,
            password
          },
          singlerow: true
        }
      ]
    }).subscribe((user: User) => {
      this.user = user;
      this.storage.setData('user', user);
      this.router.navigate(['/' + (!this.isMobile ? 'web' : 'mobile/tabs') + '/dashboard'], { replaceUrl: true });
    });
  }

  register(username, password) {

  }

  logout() {
    this.user = null;
    this.storage.removeData('user');
    this.router.navigate(['/login']);
  }
}
