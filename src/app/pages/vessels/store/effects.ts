import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, catchError, switchMap } from 'rxjs';

import { VesselService } from '../services/vessel-service';

import {
  loadVessels,
  loadVesselsFailure,
  loadVesselsSuccess
} from './actions';

export const loadVesselsEffect = createEffect(
  (actions$ = inject(Actions), vesselsService = inject(VesselService)) => {
    return actions$.pipe(
      ofType(loadVessels),
      switchMap(() =>
        vesselsService.getVessels().pipe(
          map((vessels) => loadVesselsSuccess(vessels)),
          catchError((error) => of(loadVesselsFailure(error.message || 'Error loading vessels')))
        )
      )
    );
  },
  { functional: true }
);
