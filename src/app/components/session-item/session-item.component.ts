import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Event, Session } from '@models/event.model';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-session-item',
  standalone: true,
  imports: [DatePipe, MatInput, MatIconButton, MatIcon, ReactiveFormsModule],
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionItemComponent implements OnInit {
  public quantity: FormControl<number>;

  @Input() public event: Event;
  @Input() public session!: Session;
  @Output() public quantityUpdated: EventEmitter<number> = new EventEmitter();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      const cart = this.shoppingCartService.cart();
      if (cart) {
        this.updateQuantity();
        this.cdRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.initQuantity();
  }

  public increaseQuantity(): void {
    this.quantity.setValue(this.quantity.value + 1);
  }

  public decreaseQuantity(): void {
    if (this.quantity.value <= 0) return;
    this.quantity.setValue(this.quantity.value - 1);
  }

  private initQuantity(): void {
    const cartQuantity =
      this.shoppingCartService
        .cart()
        .items.find((item) => item.event.id === this.event.id)
        ?.tickets?.find((ticket) => ticket.date === this.session.date)?.quantity ?? 0;

    this.quantity = new FormControl<number>({ value: cartQuantity, disabled: true }, { nonNullable: true });
    this.quantity.addValidators([Validators.required, Validators.min(0), Validators.max(this.session.availability)]);
    this.quantity.valueChanges.pipe(tap((quantity) => this.quantityUpdated.emit(quantity))).subscribe();
  }

  private updateQuantity(): void {
    const cartQuantity =
      this.shoppingCartService
        .cart()
        .items.find((item) => item.event.id === this.event.id)
        ?.tickets?.find((ticket) => ticket.date === this.session.date)?.quantity ?? 0;

    this.quantity.patchValue(cartQuantity, { emitEvent: false });
  }
}
