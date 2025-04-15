import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartItem } from '@models/cart.model';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [DatePipe, MatIcon, MatIconButton],
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() public cartItem!: CartItem;

  constructor() {}

  ngOnInit() {}
}
