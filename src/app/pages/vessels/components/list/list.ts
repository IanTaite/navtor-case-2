import { Component, OnInit, viewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { loadVessels } from '../../store/actions';
import {
  selectVesselsData,
  selectVesselsLoading,
  selectVesselsApiError,
} from '../../store/selectors';
import { Vessel } from '../../models/vessel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vessels-list2',
  imports: [AsyncPipe, AgGridAngular],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  private router = inject(Router);
  private store = inject(Store);
  private grid = viewChild(AgGridAngular);

  readonly items$ = this.store.select(selectVesselsData);
  readonly loading$ = this.store.select(selectVesselsLoading);
  readonly error$ = this.store.select(selectVesselsApiError);

  readonly columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'mmsi', headerName: 'Mmsi' },
    { field: 'imo', headerName: 'Imo' },
    { field: 'companyName', headerName: 'Company Name' },
    { field: 'vesselType', headerName: 'Vessel Type' },
  ];

  readonly gridTheme = themeQuartz.withParams({ accentColor: '#324158' });

  onGridReady(): void {
    this.grid()?.api.sizeColumnsToFit();
  }

  onRowClicked(event: any): void {
    const vessel: Vessel = event.data;
    this.router.navigate(['/emissions'], { queryParams: { vessel: vessel.id } });
  }
}
