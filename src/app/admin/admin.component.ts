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
import { AlertChartComponent } from '../alert-chart/alert-chart.component';
import { FuelChartComponent } from '../fuel-chart/fuel-chart.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,NgIf,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  public showMonth = false;
  public thing_id = 0;  
  public searchResults:any = [];
  public thing: any;
  public fleet = 'My fleet';
  public date = '';
  public time = 'yearly';
  public year = 2024;

  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


public currentDate = new Date();
    
// Extract the month number from the current date (months are zero-based, so January is 0)
public currentMonthNumber = this.currentDate.getMonth() ; // Adding 1 to adjust for zero-based indexing


public month =  this.currentMonthNumber;
public showMenu = false;

toggleMenu() {
  this.showMenu = !this.showMenu;
}

  public nextYear() {
    this.year = this.year + 1;
    this.date = this.year.toString();
    this.updateDashboard();
  }

  public prevYear() {
    this.year = this.year - 1;
    this.date = this.year.toString();
    this.updateDashboard();
  }

  public nextMonth() {
    this.month = this.month + 1;
    this.date = this.monthNames[this.month] + ' 2024';
    this.updateDashboard();
  }

  public prevMonth() {
    this.month = this.month - 1;
    this.date = this.monthNames[this.month] + ' 2024';
    this.updateDashboard();
  }

  public reset(){
    this.searchResults = [];
    this.thing_id = 0;
    this.time = 'yearly';
    this.date= '2024';
    this.updateDashboard();
    this.fleet = 'My fleet';
  }


  updateDashboard(event?: any) {

    // check if event is passed
    if(!event) {
      
    }else {
      this.time = event.target.value;

    }

    this.showMenu = false;


    if( this.time== 'yearly') {



      this.date = '';


    }


    if(this.time == 'monthly') {

      this.date = this.year.toString();




      
    }

    if(this.time == 'daily') {


      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
          let currentDate = new Date();
    
          // Extract the month number from the current date (months are zero-based, so January is 0)
          let currentMonthNumber = currentDate.getMonth() ; // Adding 1 to adjust for zero-based indexing
    
          // make the current month in the date var
          this.date = monthNames[currentMonthNumber] + ' 2024'


      
    
  }
 
  }



}
