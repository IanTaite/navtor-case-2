import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { loadVessels, loadEmissions } from './store/actions';
import { selectChosenVessel, selectChosenVesselName, selectEmissionsData, selectEmissionsLoading, selectVessels } from './store/selectors';

import { VesselPicker } from './components/vessel-picker/vessel-picker';
import { Chart } from './components/chart/chart';

@Component({
  selector: 'app-emissions-main',
  imports: [
    AsyncPipe,
    VesselPicker,
    Chart
  ],
  templateUrl: './main.html',
})
export class Main implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  readonly vessels$ = this.store.select(selectVessels);
  readonly chosenVessel$ = this.store.select(selectChosenVessel);
  readonly chosenVesselName$ = this.store.select(selectChosenVesselName);
  readonly emissionsData$ = this.store.select(selectEmissionsData);
  readonly loadingEmissions$ = this.store.select(selectEmissionsLoading);

  ngOnInit(): void {
    this.store.dispatch(loadVessels());

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        if (params['vessel']) {
          const vesselId = Number(params['vessel']);
          this.store.dispatch(loadEmissions({vesselId}));
        }
      });
  }

  handleVesselChange(vesselId: number): void {
    this.router.navigate(['/emissions'], { queryParams: { vessel: vesselId } });
  }
}
