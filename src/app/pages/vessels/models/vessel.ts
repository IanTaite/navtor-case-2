import { VesselType } from './vessel-type';

export interface Vessel {
  id: number;
  name: string;
  mmsi: number;
  imo: number;
  companyId: number;
  companyName: string;
  startDate: string; // ISO 8601 date string
  active: boolean;
  vesselType: VesselType;
}
