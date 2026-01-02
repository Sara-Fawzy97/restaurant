import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AllRestaurantsComponent } from './views/all-restaurants/all-restaurants.component';
import { OneRestaurantComponent } from './views/one-restaurant/one-restaurant.component';

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
  }
 
];
