import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { VesselEmissions } from '../models/vessel-emissions';
import { EmissionsTimeSeries } from '../models/emissions-time-series';

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://frontendteamfiles.blob.core.windows.net/exercises/emissions.json';

  getAllEmissions(): Observable<VesselEmissions[]> {
    return this.http.get<VesselEmissions[]>(this.apiUrl).pipe();
  }

  getEmissionsByVesselId(vesselId: number): Observable<VesselEmissions | undefined> {
    return this.http.get<VesselEmissions[]>(this.apiUrl).pipe(
      map(emissions => emissions.find(e => e.id === vesselId))
    );
  }

  getEmissionsTimeSeriesByVesselId(vesselId: number): Observable<EmissionsTimeSeries[]> {
    return this.getEmissionsByVesselId(vesselId).pipe(
      map(emissions => emissions?.timeSeries || [])
    );
  }

  getEmissionsByDateRange(startDate: string, endDate: string): Observable<VesselEmissions[]> {
    return this.http.get<VesselEmissions[]>(this.apiUrl).pipe(
      map(emissions => {
        return emissions.map(vessel => ({
          ...vessel,
          timeSeries: vessel.timeSeries.filter(ts =>
            ts.report_from_utc >= startDate && ts.report_to_utc <= endDate
          )
        })).filter(vessel => vessel.timeSeries.length > 0);
      })
    );
  }

  getTotalEmissionsByVesselId(vesselId: number): Observable<{
    co2_total: number;
    sox_total: number;
    nox_total: number;
    pm_total: number;
    ch4_total: number;
  } | null> {
    return this.getEmissionsTimeSeriesByVesselId(vesselId).pipe(
      map(timeSeries => {
        if (timeSeries.length === 0) return null;

        return timeSeries.reduce((totals, ts) => ({
          co2_total: totals.co2_total + ts.co2_emissions,
          sox_total: totals.sox_total + ts.sox_emissions,
          nox_total: totals.nox_total + ts.nox_emissions,
          pm_total: totals.pm_total + ts.pm_emissions,
          ch4_total: totals.ch4_total + ts.ch4_emissions
        }), {
          co2_total: 0,
          sox_total: 0,
          nox_total: 0,
          pm_total: 0,
          ch4_total: 0
        });
      })
    );
  }
}
