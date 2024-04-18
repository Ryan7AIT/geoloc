import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-fuel-chart',
  standalone: true,
  imports: [],
  templateUrl: './fuel-chart.component.html',
  styleUrl: './fuel-chart.component.css'
})
export class FuelChartComponent {


  constructor(private dashboardService: DashboardService) {}
  public thing_id = 0;  

  public xAxisLabels: string[] = [];
  public yAxisData: number[] = [];

  ngOnInit(): void {
    this.createChart();
    this.getDataFromApi(this.thing_id);
    // setTimeout(() => {  this.getDataFromApi(this.thing_id); }, 200);
    // setTimeout(() => {  this.getDataFromApi(this.thing_id); }, 100);
  }


  
  public chart: any;

  createChart() {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
    // const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data

    
    this.chart = new Chart('MyChart8', {
      type: 'bar',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: 'Fule Consumption',
            data: this.yAxisData,
            backgroundColor: 'rgba(4, 120, 228, 0.871)',
          },
   
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }



  getDataFromApi(thing_id: number) {
    
    // Call the appropriate method from the dashboard service to fetch data from the API endpoint
    this.dashboardService.getFuelConsumptionYears(thing_id).subscribe(
      (data:any) => {
  
        
        // Process the data returned from the API
        this.xAxisLabels = data[0];
        this.yAxisData = data[1];


            // Update the chart with the new data
    this.chart.data.labels = this.xAxisLabels;
    this.chart.data.datasets[0].data = this.yAxisData;
    this.chart.update();


      },
      (error:any) => {
        // Handle any errors that occur during the API call
        console.error(error);
      }
    );
  }



  updateDashboard(mode:string,thing_id:any,group_id:any,type_id:any,year?:number,month?:number) {

    if(mode=='yearly') {
      this.dashboardService.getFuelConsumptionYears(thing_id,group_id,type_id).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
      this.chart.update();
  
  
        },
        (error:any) => {
          // Handle any errors that occur during the API call
          console.error(error);
        }
      );

    
    }else if(mode=='monthly') {
      this.dashboardService.getFuelConsumptionMonths(thing_id,group_id,type_id,year as number).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
      this.chart.update();
  
  
        },
        (error:any) => {
          // Handle any errors that occur during the API call
          console.error(error);
        }
      );
  
      // Update the chart with the new data

    
    
    }
    else if(mode=='daily') {
      this.dashboardService.getFuelConsumptionDays(thing_id,year as number, month as number,group_id,type_id).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
      this.chart.update();
  
  
        },
        (error:any) => {
          // Handle any errors that occur during the API call
          console.error(error);
        }
      );
  
        }

}

}
