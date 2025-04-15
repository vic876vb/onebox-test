import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect } from '@angular/core';
import { ShoppingCartItemComponent } from '@components/shopping-cart-item/shopping-cart-item.component';
import { Cart } from '@models/cart.model';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {
  public cart: Cart = { items: [] };

  constructor(
    private shoppingCartService: ShoppingCartService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      const cart = this.shoppingCartService.cart();
      if (cart) {
        this.cart = cart;
        this.cdRef.markForCheck();
      }
    });
  }
}
