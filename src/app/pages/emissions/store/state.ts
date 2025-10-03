import { EmissionsTimeSeries } from '../models/emissions-time-series';
import { Vessel } from '../models/vessel';

export interface AppState {
  emissionsLoading: boolean;
  emissionsApiError: string;
  emissionsData: EmissionsTimeSeries[]|null;
  vesselsLoading: boolean;
  vesselsApiError: string;
  vesselsData: Vessel[];
  chosenVessel: number|null;
}

export const initialState: AppState = {
  emissionsLoading: false,
  emissionsApiError: '',
  emissionsData: null,
  vesselsLoading: false,
  vesselsApiError: '',
  vesselsData: [],
  chosenVessel: null
};
