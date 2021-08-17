import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RestaurantResolverService } from './resolvers/restaurant-resolver.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'web',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/web/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'new-dish',
        loadChildren: () => import('./pages/web/new-dish/new-dish.module').then(m => m.NewDishPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/web/menu/menu.module').then(m => m.MenuPageModule)
      }
    ],
    resolve: {
      restaurant: RestaurantResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'mobile',
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./pages/mobile/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./pages/mobile/restaurant/restaurant.module').then(m => m.RestaurantPageModule)
      },
    ],
    resolve: {
      restaurant: RestaurantResolverService
    },
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
