import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AllRestaurantsComponent } from './views/all-restaurants/all-restaurants.component';
import { OneRestaurantComponent } from './views/one-restaurant/one-restaurant.component';
import { CartPageComponent } from './views/cart-page/cart-page.component';
import { OneUserComponent } from './views/one-user/one-user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurants',
    component: AllRestaurantsComponent
  },
  {path:'restaurant/:id',
  component: OneRestaurantComponent
  },
  {path:'cart',
  component: CartPageComponent
  },
  {path:'profile',
    component: OneUserComponent
    },
 
];
