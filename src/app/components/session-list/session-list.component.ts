import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { EventInfo } from '@models/event.model';
import { EventsService } from '@services/events.service';
import { EMPTY, of } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { eventsParam } from 'src/app/app.paths';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCartComponent } from '@components/shopping-cart/shopping-cart.component';
import { SessionItemComponent } from '../session-item/session-item.component';
import { ShoppingCartService } from '@services/shopping-cart.service';

type SessionForm = {
  availability: FormControl<number>;
  quantity: FormControl<number>;
};
type SessionFormGroup = FormGroup<SessionForm>;

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [MatCard, MatCardContent, ReactiveFormsModule, ShoppingCartComponent, SessionItemComponent],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionListComponent implements OnInit {
  private _eventInfo = signal<EventInfo>(<EventInfo>{});
  public eventInfo = this._eventInfo.asReadonly();

  public eventSessionForm = this.formBuilder.group({
    sessions: this.formBuilder.array<SessionFormGroup>([])
  });

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private formBuilder: NonNullableFormBuilder,
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

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (!Object.prototype.hasOwnProperty.call(params, eventsParam)) return EMPTY;
          return of(params[eventsParam] as string);
        }),
        distinctUntilChanged(),
        tap((id) => console.log(id)),
        switchMap((id) => this.eventsService.getEventInfo(id)),
        tap((eventInfo) => console.log(eventInfo)),
        tap((eventInfo) => {
          if (!eventInfo) return;
          const sortedSessions = eventInfo.sessions?.sort((a, b) => Number(a.date) - Number(b.date)) || [];
          this._eventInfo.set({ ...eventInfo, sessions: sortedSessions });

          const formGroups = sortedSessions.map((session) =>
            this.formBuilder.group({
              availability: [session.availability],
              quantity: [{ value: 0, disabled: true }, [Validators.min(0), Validators.max(session.availability)]]
            })
          );

          this.eventSessionForm.setControl('sessions', this.formBuilder.array(formGroups));
        }),
        tap((event) => {}),
        tap(() => console.log(this.eventSessionForm))
      )
      .subscribe();
  }

  get sessionControls(): FormArray<SessionFormGroup> {
    return this.eventSessionForm.get('sessions') as FormArray<SessionFormGroup>;
  }

  public updateCart(quantity: number, date: Date | string | number) {
    this.shoppingCartService.updateCart({
      ...this.eventInfo(),
      ticket: { date, quantity }
    });
  }
}
