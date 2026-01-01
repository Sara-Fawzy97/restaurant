import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsService} from '../../shared/services/restaurants.service';
import { Restaurant } from '../../interfaces/Restaurant';

@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.loading = true;
    this.error = null;

    this.restaurantsService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load restaurants. Please try again later.';
        this.loading = false;
        console.error('Error loading restaurants:', err);
      }
    });
  }
}


