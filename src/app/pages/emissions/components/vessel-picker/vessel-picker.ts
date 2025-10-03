import { Component, inject, input, output, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-emissions-vessel-picker',
  imports: [ReactiveFormsModule],
  templateUrl: './vessel-picker.html',
  styleUrl: './vessel-picker.scss'
})
export class VesselPicker implements OnChanges {
  readonly selectedVesselId = input<number|null>();
  readonly vessels = input<{id: number, name: string}[] | null>();
  readonly vesselChanged = output<number>();

  private fb = inject(FormBuilder);

  readonly form = this.fb.group({
    vessel: this.fb.control<number | null>(null)
  });

  ngOnChanges(): void {
    this.form.patchValue({
      vessel: this.selectedVesselId()
    });
  }

  onVesselChange(): void {
    const vesselId = this.form.value.vessel;
    if (vesselId && vesselId !== this.selectedVesselId()) {
      this.vesselChanged.emit(Number(vesselId));
    }
  }
}
