import { Routes } from '@angular/router';
import { Shell } from './shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
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
