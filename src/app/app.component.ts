import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MapComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
/**
 * Represents the root component of the geoloc application.
 */
export class AppComponent {
  title = 'geoloc';
}
