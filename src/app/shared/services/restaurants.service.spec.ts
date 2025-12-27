import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantsService, Restaurant } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantsService]
    });
    service = TestBed.inject(RestaurantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRestaurants', () => {
    it('should return an Observable<Restaurant[]>', () => {
      const mockRestaurants: Restaurant[] = [
        { id: 1, name: 'Test Restaurant 1', description: 'Test Description 1' },
        { id: 2, name: 'Test Restaurant 2', description: 'Test Description 2' }
      ];

      service.getRestaurants().subscribe(restaurants => {
        expect(restaurants.length).toBe(2);
        expect(restaurants).toEqual(mockRestaurants);
      });

      const req = httpMock.expectOne('https://fakerestaurantapi.runasp.net/api/Restaurant');
      expect(req.request.method).toBe('GET');
      req.flush(mockRestaurants);
    });
  });

  describe('getRestaurantById', () => {
    it('should return an Observable<Restaurant>', () => {
      const mockRestaurant: Restaurant = {
        id: 1,
        name: 'Test Restaurant',
        description: 'Test Description'
      };

      service.getRestaurantById(1).subscribe(restaurant => {
        expect(restaurant).toEqual(mockRestaurant);
      });

      const req = httpMock.expectOne('https://fakerestaurantapi.runasp.net/api/Restaurant/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockRestaurant);
    });
  });

  describe('createRestaurant', () => {
    it('should create a restaurant and return an Observable<Restaurant>', () => {
      const newRestaurant: Restaurant = {
        name: 'New Restaurant',
        description: 'New Description'
      };

      const createdRestaurant: Restaurant = {
        id: 3,
        ...newRestaurant
      };

      service.createRestaurant(newRestaurant).subscribe(restaurant => {
        expect(restaurant).toEqual(createdRestaurant);
      });

      const req = httpMock.expectOne('https://fakerestaurantapi.runasp.net/api/Restaurant');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newRestaurant);
      req.flush(createdRestaurant);
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant and return an Observable<Restaurant>', () => {
      const updatedRestaurant: Restaurant = {
        id: 1,
        name: 'Updated Restaurant',
        description: 'Updated Description'
      };

      service.updateRestaurant(1, updatedRestaurant).subscribe(restaurant => {
        expect(restaurant).toEqual(updatedRestaurant);
      });

      const req = httpMock.expectOne('https://fakerestaurantapi.runasp.net/api/Restaurant/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedRestaurant);
      req.flush(updatedRestaurant);
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant and return an Observable<void>', () => {
      service.deleteRestaurant(1).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne('https://fakerestaurantapi.runasp.net/api/Restaurant/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});



