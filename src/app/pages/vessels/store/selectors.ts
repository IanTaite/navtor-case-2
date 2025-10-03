import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

// Feature selector for vessels
const selectVesselsFeature = createFeatureSelector<AppState>('vessels');

export const selectVesselsData = createSelector(
  selectVesselsFeature,
  (state) => state?.vesselsData || []
);

export const selectVesselsLoading = createSelector(
  selectVesselsFeature,
  (state) => state?.vesselsLoading || false
);

export const selectVesselsApiError = createSelector(
  selectVesselsFeature,
  (state) => state?.vesselsApiError || ''
);
