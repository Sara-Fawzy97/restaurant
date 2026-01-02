import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRestaurantComponent } from './one-restaurant.component';

describe('OneRestaurantComponent', () => {
  let component: OneRestaurantComponent;
  let fixture: ComponentFixture<OneRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
