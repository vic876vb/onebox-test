import { HttpClient } from '@angular/common/http';
import { EventItemComponent } from '@components/event-item/event-item.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { Event } from '@models/event.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventsService } from '@services/events.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventItemComponent],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {
  public events: Event[];
  constructor(
    private eventsService: EventsService,
    private cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      const events = this.eventsService.events();
      if (events) {
        this.events = events.sort((a, b) => Number(a.endDate) - Number(b.endDate));
        this.cdRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.eventsService.loadEvents().subscribe();
  }
}
