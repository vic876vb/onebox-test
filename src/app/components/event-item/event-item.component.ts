import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Event } from '@models/event.model';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { SafeHtmlPipe } from '@shared/safe-html.pipe';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { eventsPath } from 'src/app/app.paths';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardImage,
    MatCardFooter,
    MatButton,
    SafeHtmlPipe,
    DatePipe,
    RouterModule
    // RouterLinkActive
  ],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventItemComponent {
  @Input() public event!: Event;

  constructor() {}
}
