import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  loadVessels,
  loadVesselsFailure,
  loadVesselsSuccess,
  clearVessels,
  chooseVessel,
} from './actions';

export const reducer = createReducer(
  initialState,
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
