import { Route } from '@angular/router';
import { Main } from './main';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { reducer } from './store/reducer';
import * as effects from './store/effects';

export default [
  {
    path: '',
    component: Main,
    providers: [
      provideState('vessels', reducer),
      provideEffects(effects)
    ],
  }
] as Route[];
