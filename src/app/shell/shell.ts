import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-shell',
  imports: [NavBar, RouterOutlet],
  templateUrl: './shell.html'
})
export class Shell {}
