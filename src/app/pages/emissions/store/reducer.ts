import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  loadEmissions,
  loadEmissionsSuccess,
  loadEmissionsFailure,
  clearEmissions,
  loadVessels,
  loadVesselsFailure,
  loadVesselsSuccess,
  clearVessels,
  chooseVessel,
//  chooseVessel
} from './actions';

export const reducer = createReducer(
  initialState,
  on(loadEmissions, (state, { vesselId }) => ({
    ...state,
    emissionsLoading: true,
    emissionsApiError: '',
    emissionsData: null,
    chosenVessel: vesselId
  })),
  on(loadEmissionsSuccess, (state, { emissions, vesselId }) => ({
    ...state,
    emissionsLoading: false,
    emissionsData: emissions,
    chosenVessel: vesselId
  })),
  on(loadEmissionsFailure, (state, { error }) => ({
    ...state,
    emissionsLoading: false,
    emissionsApiError: error,
    emissionsData: null,
    chosenVessel: null
  })),
  on(clearEmissions, (state) => ({
    ...state,
    emissionsLoading: false,
    emissionsApiError: '',
    emissionsData: null,
    chosenVessel: null
  })),
  on(loadVessels, (state) => ({
    ...state,
    vesselsLoading: true,
    vesselsApiError: '',
    vesselsData: [],
  })),
  on(loadVesselsSuccess, (state, { vessels }) => ({
    ...state,
    vesselsApiError: '',
    vesselsData: vessels,
    vesselsLoading: false,
  })),
  on(loadVesselsFailure, (state, { error }) => ({
    ...state,
    vesselsApiError: error,
    vesselsData: [],
    vesselsLoading: false,
  })),
  on(clearVessels, (state) => ({
    ...state,
    vesselsApiError: '',
    vesselsData: [],
    vesselsLoading: false,
  })),
  on(chooseVessel, (state, { vesselId }) => ({
    ...state,
    selectedVessel: state.vesselsData.find(v => v.id === vesselId) || null
  }))
);
