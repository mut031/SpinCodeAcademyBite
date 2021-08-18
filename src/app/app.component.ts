import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { CartService } from './services/cart.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isMobile: boolean;
  cartCount: number;

  constructor(
    private menuCtrl: MenuController,
    private storage: StorageService,
    private userService: UserService,
    private router: Router,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.userService.isMobile = this.platform.is('mobileweb') || this.platform.is('mobile');
    this.isMobile = this.userService.isMobile;
    this.storage.getData('user').then(user => {
      this.userService.user = JSON.parse(user.value);
      if (user.value) {
        if (this.isMobile) {
          this.router.navigate(['mobile/tabs/dashboard'], { replaceUrl: true });
        }
      }
    });
  }

  async openMenu() {
    await this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  logout() {
    this.userService.logout();
    this.closeMenu();
  }
}
