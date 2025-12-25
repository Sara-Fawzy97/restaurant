import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AllRestaurantsComponent } from './views/all-restaurants/all-restaurants.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurants',
    component: AllRestaurantsComponent
  },
 
];
