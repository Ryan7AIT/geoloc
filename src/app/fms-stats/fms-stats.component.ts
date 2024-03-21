import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from '../map/map.component';
import { RouterOutlet } from '@angular/router';
import { DistanceChartComponent } from '../distance-chart/distance-chart.component';
import { CarUtilizationComponent } from '../car-utilization/car-utilization.component';
import { AvgMaxSpeedChartComponent } from '../avg-max-speed-chart/avg-max-speed-chart.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-fms-stats',
  standalone: true,
  imports: [LineChartComponent,MapComponent,DistanceChartComponent,CarUtilizationComponent,AvgMaxSpeedChartComponent,CommonModule,NgIf],
  templateUrl: './fms-stats.component.html',
  styleUrl: './fms-stats.component.css'
})
export class FmsStatsComponent  implements AfterViewInit{
  @ViewChild(DistanceChartComponent) distanceChartComponent!: DistanceChartComponent;
  @ViewChild(CarUtilizationComponent) carUtilizationComponent!: CarUtilizationComponent;
  @ViewChild(AvgMaxSpeedChartComponent) avgMaxSpeedChartComponent!: AvgMaxSpeedChartComponent;


  public showMonth = false;
  public thing_id = 629;  

  public showMonthInput(event:any) {

  }

  ngAfterViewInit(): void {
    console.log(this.distanceChartComponent);

  }
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
   

  }

  public showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  updateDashboard(event: any) {


    if(event.target.value == 'yearly') {
      this.distanceChartComponent.updateDashboard('yearly');
      // set 0.5 timeout
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('yearly');
      }, 100);

      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('yearly');
      }, 200);


    }


    if(event.target.value == 'monthly') {
      this.distanceChartComponent.updateDashboard('monthly');
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('monthly');
      }, 100);     
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('monthly');
      }, 200);
      
    }

    if(event.target.value == 'daily') {
      this.distanceChartComponent.updateDashboard('daily');
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('daily');
      }, 100);  
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('daily');
      }, 200);
      
    
  }
 
  }



  }

