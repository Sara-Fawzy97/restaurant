import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from '../../interfaces/Order';
import { User } from '../../interfaces/User';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllOrders', () => {
    it('should return an Observable<Order[]>', () => {
      const mockOrders: Order[] = [
        { 
          masterID: 1, 
          userID: { id: 1, userEmail: 'test@test.com' } as User,
          usercode: { id: 1, userEmail: 'test@test.com' } as User,
          restaurantID: 1,
          grandtotal: 100
        },
        { 
          masterID: 2, 
          userID: { id: 2, userEmail: 'test2@test.com' } as User,
          usercode: { id: 2, userEmail: 'test2@test.com' } as User,
          restaurantID: 2,
          grandtotal: 200
        }
      ];

      service.getAllOrders().subscribe(orders => {
        expect(orders.length).toBe(2);
        expect(orders).toEqual(mockOrders);
      });

      const req = httpMock.expectOne('/api/Order');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);
    });
  });

  describe('getOrderById', () => {
    it('should return an Observable<Order>', () => {
      const mockOrder: Order = {
        masterID: 1,
        userID: { id: 1, userEmail: 'test@test.com' } as User,
        usercode: { id: 1, userEmail: 'test@test.com' } as User,
        restaurantID: 1,
        grandtotal: 100
      };

      service.getOrderById(1).subscribe(order => {
        expect(order).toEqual(mockOrder);
      });

      const req = httpMock.expectOne('/api/Order/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrder);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return an Observable<Order[]>', () => {
      const mockOrders: Order[] = [
        { 
          masterID: 1, 
          userID: { id: 1, userEmail: 'test@test.com' } as User,
          usercode: { id: 1, userEmail: 'test@test.com' } as User,
          restaurantID: 1,
          grandtotal: 100
        }
      ];

      service.getOrdersByUserId(1).subscribe(orders => {
        expect(orders.length).toBe(1);
        expect(orders).toEqual(mockOrders);
      });

      const req = httpMock.expectOne('/api/Order/user/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);
    });
  });

  describe('getOrdersByRestaurantId', () => {
    it('should return an Observable<Order[]>', () => {
      const mockOrders: Order[] = [
        { 
          masterID: 1, 
          userID: { id: 1, userEmail: 'test@test.com' } as User,
          usercode: { id: 1, userEmail: 'test@test.com' } as User,
          restaurantID: 1,
          grandtotal: 100
        }
      ];

      service.getOrdersByRestaurantId(1).subscribe(orders => {
        expect(orders.length).toBe(1);
        expect(orders).toEqual(mockOrders);
      });

      const req = httpMock.expectOne('/api/Order/restaurant/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', () => {
      const newOrder: Order = {
        masterID: 0,
        userID: { id: 1, userEmail: 'test@test.com' } as User,
        usercode: { id: 1, userEmail: 'test@test.com' } as User,
        restaurantID: 1,
        grandtotal: 100
      };

      const createdOrder: Order = {
        ...newOrder,
        masterID: 1
      };

      service.createOrder(newOrder).subscribe(order => {
        expect(order).toEqual(createdOrder);
      });

      const req = httpMock.expectOne('/api/Order');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newOrder);
      req.flush(createdOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order', () => {
      const updatedOrder: Order = {
        masterID: 1,
        userID: { id: 1, userEmail: 'test@test.com' } as User,
        usercode: { id: 1, userEmail: 'test@test.com' } as User,
        restaurantID: 1,
        grandtotal: 150
      };

      service.updateOrder(1, updatedOrder).subscribe(order => {
        expect(order).toEqual(updatedOrder);
      });

      const req = httpMock.expectOne('/api/Order/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedOrder);
      req.flush(updatedOrder);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', () => {
      service.deleteOrder(1).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne('/api/Order/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});

