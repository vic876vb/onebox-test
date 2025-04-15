// import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ShoppingCartItemComponent } from './shopping-cart-item.component';

// describe('ShoppingCartItemComponent', () => {
//   let component: ShoppingCartItemComponent;
//   let fixture: ComponentFixture<ShoppingCartItemComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [ShoppingCartItemComponent]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ShoppingCartItemComponent);
//     component = fixture.componentInstance;
//     component.cartItem = {
//       event: {
//         id: '1'
//       }
//     };
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { DatePipe } from '@angular/common';
// import { ChangeDetectorRef, Component, effect, Input } from '@angular/core';
// import { MatIconButton } from '@angular/material/button';
// import { CartItem, Ticket } from '@models/cart.model';
// import { ShoppingCartService } from '@services/shopping-cart.service';

// @Component({
//   selector: 'app-shopping-cart-item',
//   standalone: true,
//   imports: [DatePipe, MatIconButton],
//   templateUrl: './shopping-cart-item.component.html',
//   styleUrls: ['./shopping-cart-item.component.scss']
// })
// export class ShoppingCartItemComponent {
//   @Input() public cartItem!: CartItem;

//   constructor(
//     private shoppingCartService: ShoppingCartService,
//     private cdRef: ChangeDetectorRef
//   ) {
//     effect(() => {
//       const cart = this.shoppingCartService.cart();
//       if (cart) {
//         this.cdRef.markForCheck();
//       }
//     });
//   }

//   public removeFromCart(ticket: Ticket): void {
//     this.shoppingCartService.removeFromCart({
//       event: this.cartItem?.event,
//       ticket
//     });
//   }
// }

// Test Suite for ShoppingCartItemComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartItemComponent } from './shopping-cart-item.component';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { CartItem, Ticket } from '@models/cart.model';

describe('ShoppingCartItemComponent', () => {
  let component: ShoppingCartItemComponent;
  let fixture: ComponentFixture<ShoppingCartItemComponent>;
  let shoppingCartServiceMock: jasmine.SpyObj<ShoppingCartService>;

  beforeEach(async () => {
    shoppingCartServiceMock = jasmine.createSpyObj('ShoppingCartService', ['removeFromCart', 'cart']);
    shoppingCartServiceMock.cart.and.returnValue({ items: [] }); // Mock the cart observable

    await TestBed.configureTestingModule({
      imports: [ShoppingCartItemComponent],
      providers: [{ provide: ShoppingCartService, useValue: shoppingCartServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = {
      event: { id: '1', title: 'Test Event' }, // Mock CartItem
      tickets: []
    } as CartItem;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeFromCart when removeFromCart method is called', () => {
    const ticket: Ticket = { date: '2025-01-01', quantity: 1 };
    component.removeFromCart(ticket);
    expect(shoppingCartServiceMock.removeFromCart).toHaveBeenCalledWith({
      event: component.cartItem.event,
      ticket
    });
  });
});
