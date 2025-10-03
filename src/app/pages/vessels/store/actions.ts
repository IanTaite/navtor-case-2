import { createAction, props } from '@ngrx/store';
import { Vessel } from '../models/vessel';

export const loadVessels = createAction('[Vessels] Load Vessels');

export const loadVesselsSuccess = createAction(
  '[Vessels] Load Vessels Success',
  (vessels: Vessel[]) => ({ vessels })
);

export const loadVesselsFailure = createAction(
  '[Vessels] Load Vessels Failure',
  (error: string) => ({ error })
);

export const clearVessels = createAction('[Vessels] Clear Vessels');

export const chooseVessel = createAction('[Vessels] Choose Vessel', props<{ vesselId: number }>());
