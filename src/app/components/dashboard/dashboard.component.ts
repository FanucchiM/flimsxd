import { Component } from '@angular/core';
import { MoviesListComponent } from './movies-list/movies-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MoviesListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
