import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, catchError, switchMap } from 'rxjs';

import { EmissionsService } from '../services/emissions-service';
import { VesselService } from '../services/vessel-service';

import {
  loadEmissions,
  loadEmissionsSuccess,
  loadEmissionsFailure,
  loadVessels,
  loadVesselsFailure,
  loadVesselsSuccess
} from './actions';

export const loadEmissionsEffect = createEffect(
  (actions$ = inject(Actions), emissionsService = inject(EmissionsService)) => {
    return actions$.pipe(
      ofType(loadEmissions),
      switchMap(({vesselId}) =>
        emissionsService.getEmissionsByVesselId(vesselId).pipe(
          map((emissions) => loadEmissionsSuccess(emissions?.timeSeries || null, vesselId)),
          catchError((error) =>
            of(loadEmissionsFailure(error.message || 'Error loading emissions'))
          )
        )
      )
    );
  },
  { functional: true }
);

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

export const chooseVesselEffect = createEffect(
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
