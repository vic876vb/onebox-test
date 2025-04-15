import { EventInfo } from './event.model';

export type Cart = { items: CartItem[] };
export type CartItem = Pick<EventInfo, 'event'> & Partial<Omit<EventInfo, 'event'>> & { tickets?: Ticket[] };
export type CartPurchase = Pick<CartItem, 'event'> & { ticket?: Ticket };

export type Ticket = {
  date?: Date | string | number;
  quantity?: number;
};
