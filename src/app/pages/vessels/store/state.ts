import { Vessel } from '../models/vessel';

export interface AppState {
  vesselsLoading: boolean;
  vesselsApiError: string;
  vesselsData: Vessel[];
}

export const initialState: AppState = {
  vesselsLoading: false,
  vesselsApiError: '',
  vesselsData: [],
};
