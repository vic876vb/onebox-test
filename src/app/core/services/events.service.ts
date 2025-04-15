import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { Event, EventInfo } from '@models/event.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';

const STORAGE_KEY = 'EVENTS';

type Action =
  | { type: 'GET_EVENT'; payload: Event['id'] }
  | { type: 'UPDATE_EVENT'; payload: EventInfo }
  | { type: 'SET_EVENTS'; payload: Event[] };

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _events = signal<Event[]>([]);
  readonly events = this._events.asReadonly();

  constructor(private http: HttpClient) {
    effect(() => {
      const current = this._events();
      this.saveToStorage(current);
    });
    this.loadEvents().subscribe();
  }

  public loadEvents() {
    const stored = this.loadFromStorage();
    return iif(() => stored.length > 0, of(stored), this.http.get<Event[]>('http://localhost:3000/events')).pipe(
      tap((data) => this.dispatch({ type: 'SET_EVENTS', payload: data })),
      switchMap(() => of(this._events())),
      tap((s) => console.log(this._events()))
    );
  }

  public getEventInfo(id: string): Observable<EventInfo> {
    console.log(this._events());
    return this.http.get<EventInfo>(`http://localhost:3000/event-info/${id}`).pipe(
      tap((data) => {
        console.log(data);
        this.dispatch({ type: 'UPDATE_EVENT', payload: data });
      }),
      tap(() => console.log(this._events()))
    );
  }

  private dispatch(action: Action): void {
    switch (action.type) {
      case 'SET_EVENTS':
        return this._events.set([...action.payload]);
      case 'UPDATE_EVENT':
        return this._events.update((events) =>
          events.map((event) => (event.id === action.payload.id ? { ...event, sessions: action.payload.sessions } : event))
        );
    }
  }

  private saveToStorage(events: Event[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  private loadFromStorage(): Event[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}
