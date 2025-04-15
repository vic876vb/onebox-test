import { Routes } from '@angular/router';
import { eventsParam, eventsPath } from './app.paths';

export const routes: Routes = [
  {
    path: eventsPath,
    loadComponent: () => import('@components/event-list/event-list.component').then((m) => m.EventListComponent)
  },
  {
    path: `${eventsPath}/:${eventsParam}`,
    loadComponent: () => import('@components/session-list/session-list.component').then((m) => m.SessionListComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@components/session-list/session-list.component').then((m) => m.SessionListComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: eventsPath,
    pathMatch: 'full'
  }
];
