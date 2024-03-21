import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from '../map/map.component';
import { RouterOutlet } from '@angular/router';
import { DistanceChartComponent } from '../distance-chart/distance-chart.component';
import { CarUtilizationComponent } from '../car-utilization/car-utilization.component';
import { AvgMaxSpeedChartComponent } from '../avg-max-speed-chart/avg-max-speed-chart.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-fms-stats',
  standalone: true,
  imports: [LineChartComponent,MapComponent,DistanceChartComponent,CarUtilizationComponent,AvgMaxSpeedChartComponent,CommonModule,NgIf,FormsModule],
  templateUrl: './fms-stats.component.html',
  styleUrl: './fms-stats.component.css'
})
export class FmsStatsComponent  implements OnInit{
  @ViewChild(DistanceChartComponent) distanceChartComponent!: DistanceChartComponent;
  @ViewChild(CarUtilizationComponent) carUtilizationComponent!: CarUtilizationComponent;
  @ViewChild(AvgMaxSpeedChartComponent) avgMaxSpeedChartComponent!: AvgMaxSpeedChartComponent;



  public showMonth = false;
  public thing_id = 0;  
  public searchResults:any = [];
  public thing: any;
  public fleet = 'My fleet';
  public date = '2024';
  public time = 'yearly';

  public selectResult(id:number,name:string) {
    this.updateDashboard();
    // this.search = event;
    this.thing_id = id;
    this.fleet = name;
      this.showMenu = false;
    this.searchResults = [];
  }

  public search(event:any) {
    
    // chechk if the value length is greate than 2
    if(event.target.value.length > 2)
    {

    this.dashboardService.search(event.target.value).subscribe((data:any) => {
      
      this.searchResults = data;
    })
  
  }else {
    this.searchResults = [];
  }
}


public reset(){
  this.searchResults = [];
  this.thing_id = 0;
  this.time = 'yearly';
  this.date= '2024';
  this.updateDashboard();
  this.fleet = 'My fleet';
}

  public showMonthInput(event:any) {

  }

 
  constructor(private dashboardService: DashboardService) {}

  public cars:any = [];
  ngOnInit() {
   
this.getCars();
  }

  public showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  updateDashboard(event?: any) {

    // check if event is passed
    if(!event) {
      
    }else {
      this.time = event.target.value;

    }

    this.showMenu = false;


    if( this.time== 'yearly') {
      this.distanceChartComponent.updateDashboard('yearly',this.thing_id);
      // set 0.5 timeout
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('yearly',this.thing_id);
      }, 100);

      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('yearly',this.thing_id);
      }, 150);


      this.date = '';


    }


    if(this.time == 'monthly') {
      this.distanceChartComponent.updateDashboard('monthly',this.thing_id);
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('monthly',this.thing_id);
      }, 100);     
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('monthly',this.thing_id);
      }, 150);

      this.date = '2024';
      
    }

    if(this.time == 'daily') {
      this.distanceChartComponent.updateDashboard('daily',this.thing_id);
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('daily',this.thing_id);
      }, 100);  
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('daily',this.thing_id);
      }, 150);

      this.date = 'January 2024';

      
    
  }
 
  }


  getCars() {
    this.dashboardService.getCars().subscribe((data: any) => {
      this.cars = data;       
    })
  }



  }

