import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, effect, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { CartItem, Ticket } from '@models/cart.model';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [DatePipe, MatIconButton],
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  @Input() public cartItem!: CartItem;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      const cart = this.shoppingCartService.cart();
      if (cart) {
        this.cdRef.markForCheck();
      }
    });
  }

  public removeFromCart(ticket: Ticket): void {
    this.shoppingCartService.removeFromCart({
      event: this.cartItem.event,
      ticket
    });
  }
}
