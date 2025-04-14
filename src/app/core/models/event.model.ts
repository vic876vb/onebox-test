export interface EventInfo {
  id: string;
  event?: Event;
  sessions?: Session[];
}

export interface Event {
  id: string;
  title?: string;
  subtitle?: string;
  image?: string;
  place?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  description?: string;
  sessions?: Session[];
}

export interface Session {
  date: Date | string | number;
  availability: number;
}
