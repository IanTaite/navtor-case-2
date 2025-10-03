import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

// Feature selector for emissions
const selectEmissionsFeature = createFeatureSelector<AppState>('emissions');

// Emissions selectors
export const selectEmissionsData = createSelector(
  selectEmissionsFeature,
  (state) => state?.emissionsData || null
);

export const selectEmissionsLoading = createSelector(
  selectEmissionsFeature,
  (state) => state?.emissionsLoading || false
);

export const selectEmissionsApiError = createSelector(
  selectEmissionsFeature,
  (state) => state?.emissionsApiError || ''
);

export const selectChosenVessel = createSelector(
  selectEmissionsFeature,
  (state) => state?.chosenVessel || null
);

export const selectVesselsData = createSelector(
  selectEmissionsFeature,
  (state) => state?.vesselsData || []
);

export const selectVesselsLoading = createSelector(
  selectEmissionsFeature,
  (state) => state?.vesselsLoading || false
);

export const selectVesselsApiError = createSelector(
  selectEmissionsFeature,
  (state) => state?.vesselsApiError || ''
);

// Composed selectors

export const selectChosenVesselName = createSelector(
  selectChosenVessel,
  selectVesselsData,
  (chosenVesselId, vessels) => {
    const vessel = vessels.find(v => v.id === chosenVesselId);
    return vessel ? vessel.name : null;
  }
);

export const selectVessels = createSelector(
  selectVesselsData,
  (vessels) => vessels.map(v => ({ id: v.id, name: v.name }))
);
