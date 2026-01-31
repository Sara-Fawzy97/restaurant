import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsService} from '../../shared/services/restaurants.service';
import { Restaurant } from '../../interfaces/Restaurant';
import { RouterLink } from "@angular/router";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-all-restaurants',
  standalone: true,
  imports: [CommonModule, RouterLink,MatPaginatorModule],
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  paginatedRestaurants:Restaurant[]=[]
  // loading: boolean = false;
  // error: string | null = null;

  constructor(private restaurantsService: RestaurantsService) { }

pageSize:number=10;
currentPage:number=0;

handlePageEvent(event:PageEvent){
this.pageSize=event.pageSize
this.currentPage=event.pageIndex
this.updatePage()
}

updatePage(){
  const startIndex=this.currentPage*this.pageSize
const endIndex=startIndex+this.pageSize

this.paginatedRestaurants=this.restaurants.slice(startIndex,endIndex)
}


//////////////fetch all restaturants 
  loadRestaurants(): void {
    // this.loading = true;
    // this.error = null;

    this.restaurantsService.getRestaurants().subscribe({
      next: (data:any) => {
        this.restaurants = data;
        console.log(data)
        this.updatePage()
        // this.loading = false;
      },
      // error: (err) => {
      //   // this.error = 'Failed to load restaurants. Please try again later.';
      //   // this.loading = false;
      //   console.error('Error loading restaurants:', err);
      // }
    });
  }


  ngOnInit(): void {
    this.loadRestaurants();
  }
}


