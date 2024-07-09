import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavsComponent } from './components/favs/favs.component';


export const routes: Routes = [
    { path: 'movies', component: DashboardComponent },
    { path: 'favorites', component: FavsComponent }
];
