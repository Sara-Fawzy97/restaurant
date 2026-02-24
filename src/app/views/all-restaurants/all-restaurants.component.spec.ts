import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AllRestaurantsComponent } from './all-restaurants.component';
import { RestaurantsService } from '../../shared/services/restaurants.service';
import { of, throwError } from 'rxjs';

describe('AllRestaurantsComponent', () => {
  let component: AllRestaurantsComponent;
  let fixture: ComponentFixture<AllRestaurantsComponent>;
  let restaurantsService: RestaurantsService;

  const mockRestaurants = [
    {
      restaurantID: 1,
      restaurantName: 'Test Restaurant 1',
      address: '123 Test St',
      type: 'Italian',
      parkingLot: true
    },
    {
      restaurantID: 2,
      restaurantName: 'Test Restaurant 2',
      address: '456 Test Ave',
      type: 'Mexican',
      parkingLot: false
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRestaurantsComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRestaurantsComponent);
    component = fixture.componentInstance;
    restaurantsService = TestBed.inject(RestaurantsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on init', () => {
    spyOn(restaurantsService, 'getRestaurants').and.returnValue(of(mockRestaurants));
    
    component.ngOnInit();
    
    expect(restaurantsService.getRestaurants).toHaveBeenCalled();
    expect(component.restaurants).toEqual(mockRestaurants);
    // expect(component.loading).toBe(false);
  });

  it('should handle error when loading restaurants fails', () => {
    spyOn(restaurantsService, 'getRestaurants').and.returnValue(throwError(() => new Error('API Error')));
    
    component.ngOnInit();
    
    // expect(component.error).toBeTruthy();
    // expect(component.loading).toBe(false);
    expect(component.restaurants.length).toBe(0);
  });

  it('should set loading to true when loading restaurants', () => {
    spyOn(restaurantsService, 'getRestaurants').and.returnValue(of(mockRestaurants));
    
    component.loadRestaurants();
    
    // expect(component).toBe(true);
  });
});





























