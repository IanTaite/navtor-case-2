import { EmissionsTimeSeries } from './emissions-time-series';

export interface VesselEmissions {
  id: number;
  timeSeries: EmissionsTimeSeries[];
}
