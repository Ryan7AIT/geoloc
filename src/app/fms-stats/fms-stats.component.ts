import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from '../map/map.component';
import { RouterOutlet } from '@angular/router';
import { DistanceChartComponent } from '../distance-chart/distance-chart.component';
import { CarUtilizationComponent } from '../car-utilization/car-utilization.component';
import { AvgMaxSpeedChartComponent } from '../avg-max-speed-chart/avg-max-speed-chart.component';

@Component({
  selector: 'app-fms-stats',
  standalone: true,
  imports: [LineChartComponent,MapComponent,DistanceChartComponent,CarUtilizationComponent,AvgMaxSpeedChartComponent],
  templateUrl: './fms-stats.component.html',
  styleUrl: './fms-stats.component.css'
})
export class FmsStatsComponent {

}
