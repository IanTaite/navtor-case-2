import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vessel } from '../models/vessel';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private http = inject(HttpClient);
  private apiUrl = 'https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json';

  getVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(this.apiUrl);
  }

  getVesselById(id: number): Observable<Vessel> {
    return this.http.get<Vessel>(`${this.apiUrl}/${id}`);
  }

  getVesselsByCompany(companyId: number): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(`${this.apiUrl}?companyId=${companyId}`);
  }

  getActiveVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(`${this.apiUrl}?active=true`);
  }
}
