import { Routes } from '@angular/router';
import { eventsPath } from './app.paths';

export const routes: Routes = [
  {
    path: eventsPath,
    loadComponent: () => import('@components/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: '**',
    redirectTo: eventsPath,
    pathMatch: 'full'
  }
];
