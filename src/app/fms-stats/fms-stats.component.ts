import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from '../map/map.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fms-stats',
  standalone: true,
  imports: [LineChartComponent,MapComponent],
  templateUrl: './fms-stats.component.html',
  styleUrl: './fms-stats.component.css'
})
export class FmsStatsComponent {

}
