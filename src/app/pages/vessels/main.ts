import { Component, inject, OnInit } from '@angular/core';
import { List } from './components/list/list';
import { Store } from '@ngrx/store';
import { loadVessels } from './store/actions';

@Component({
  selector: 'app-vessels-main',
  imports: [List],
  templateUrl: './main.html',
})
export class Main implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadVessels());
  }
}
