import { Component } from '@angular/core';
import { EventListComponent } from '@components/event-list/event-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [EventListComponent]
})
export class HomeComponent {}
