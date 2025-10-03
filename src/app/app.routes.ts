import { Routes } from '@angular/router';
import { Shell } from './shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'emissions',
        loadChildren: () => import('./pages/emissions/routes').then((m) => m.default),
      },
      {
        path: 'vessels',
        loadChildren: () => import('./pages/vessels/routes').then((m) => m.default),
      },
      {
        path: '',
        redirectTo: 'vessels',
        pathMatch: 'full',
      },
    ]
  },
];
