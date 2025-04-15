import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionItemComponent } from './session-item.component';
import { ShoppingCartService } from '@services/shopping-cart.service';

describe('SessionItemComponent', () => {
  let component: SessionItemComponent;
  let fixture: ComponentFixture<SessionItemComponent>;
  let mockCartService: jasmine.SpyObj<ShoppingCartService>;

  const mockCart = {
    items: [
      {
        event: { id: '1' },
        tickets: [{ date: '2025-01-01', quantity: 2 }]
      }
    ]
  };

  beforeEach(waitForAsync(() => {
    mockCartService = jasmine.createSpyObj('ShoppingCartService', ['cart']);
    mockCartService.cart.and.returnValue(mockCart);

    TestBed.configureTestingModule({
      imports: [SessionItemComponent],
      providers: [{ provide: ShoppingCartService, useValue: mockCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionItemComponent);
    component = fixture.componentInstance;
    component.event = { id: '1' };
    component.session = { date: '2025-01-01', availability: 2 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quantity from cart', () => {
    expect(component.quantity.value).toBe(2);
  });

  it('should increase quantity', () => {
    component.increaseQuantity();
    expect(component.quantity.value).toBe(3);
  });

  it('should decrease quantity', () => {
    component.decreaseQuantity();
    expect(component.quantity.value).toBe(1);
  });

  it('should not decrease quantity below 0', () => {
    component.quantity.setValue(0);
    component.decreaseQuantity();
    expect(component.quantity.value).toBe(0);
  });
});
