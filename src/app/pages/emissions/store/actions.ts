import { createAction, props } from '@ngrx/store';
import { Vessel } from '../models/vessel';
import { EmissionsTimeSeries } from '../models/emissions-time-series';

export const loadVessels = createAction('[Emissions] Load Vessels');

export const loadVesselsSuccess = createAction(
  '[Emissions] Load Vessels Success',
  (vessels: Vessel[]) => ({ vessels })
);

export const loadVesselsFailure = createAction(
  '[Emissions] Load Vessels Failure',
  (error: string) => ({ error })
);

export const clearVessels = createAction('[Emissions] Clear Vessels');

export const chooseVessel = createAction('[Emissions] Choose Vessel', props<{ vesselId: number }>());

export const loadEmissions = createAction(
  '[Emissions] Load Emissions',
  props<{ vesselId: number }>()
);

export const loadEmissionsSuccess = createAction(
  '[Emissions] Load Emissions Success',
  (emissions: EmissionsTimeSeries[]|null, vesselId: number) => ({ emissions, vesselId })
);

export const loadEmissionsFailure = createAction(
  '[Emissions] Load Emissions Failure',
  (error: string) => ({ error })
);

export const clearEmissions = createAction('[Emissions] Clear Emissions');
