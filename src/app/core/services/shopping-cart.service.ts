import { effect, Injectable, signal } from '@angular/core';
import { Cart, CartItem, CartPurchase } from '@models/cart.model';

const STORAGE_KEY = 'SHOPPING_CART';

type Action =
  | { type: 'ADD_CART_ITEM'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: CartPurchase }
  | { type: 'REMOVE_CART_ITEM'; payload: CartPurchase };

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _cart = signal<Cart>(this.loadFromStorage());
  readonly cart = this._cart.asReadonly();

  constructor() {
    effect(() => {
      const cart = this._cart();
      this.saveToStorage(cart);
    });
  }

  public addToCart(item: CartItem): void {
    this.dispatch({ type: 'ADD_CART_ITEM', payload: item });
  }

  public updateCart(purchase: CartPurchase): void {
    this.dispatch({ type: 'UPDATE_CART_ITEM', payload: purchase });
  }

  public removeFromCart(purchase: CartPurchase): void {
    this.dispatch({ type: 'REMOVE_CART_ITEM', payload: purchase });
  }

  private dispatch(action: Action): void {
    const { type, payload } = action;
    switch (type) {
      case 'ADD_CART_ITEM':
        return this._cart.update((cart) => ({ items: [...cart.items, payload] }));
      case 'UPDATE_CART_ITEM':
        return this._cart.update((cart) => {
          const existingItem = cart.items.find((item) => item.event.id === payload.event.id);
          if (!existingItem)
            return {
              items: [...cart.items, { event: payload.event, tickets: [payload.ticket ?? {}] }]
            };

          const existingTickets = existingItem.tickets ?? [];
          const incomingTicket = payload.ticket;
          const updatedTickets = existingTickets.some((ticket) => ticket.date === incomingTicket?.date)
            ? existingTickets.map((ticket) => (ticket.date === incomingTicket?.date ? (incomingTicket ?? {}) : ticket))
            : [...existingTickets, incomingTicket ?? {}];

          return {
            items: cart.items
              .map((item) =>
                item.event.id === payload.event.id ? { ...item, tickets: updatedTickets.filter((ticket) => ticket.quantity !== 0) } : item
              )
              .filter((item) => item.tickets?.length !== 0)
          };
        });
      case 'REMOVE_CART_ITEM':
        return this._cart.update((cart) => ({
          items: cart.items
            .map((item) =>
              item.event.id === payload.event.id
                ? { ...item, tickets: (item.tickets ?? []).filter((ticket) => ticket.date !== payload.ticket?.date) }
                : item
            )
            .filter((item) => item.tickets?.length !== 0)
        }));
    }
  }

  private saveToStorage(cart: Cart): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  private loadFromStorage(): Cart {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  }
}
