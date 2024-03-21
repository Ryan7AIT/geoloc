import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-car-utilization',
  standalone: true,
  imports: [],
  templateUrl: './car-utilization.component.html',
  styleUrl: './car-utilization.component.css'
})
export class CarUtilizationComponent {

  constructor(private dashboardService: DashboardService) {}
  public thing_id = 0;  

  public xAxisLabels: string[] = [];
  public yAxisData: number[] = [];
  public yAxisData2: number[] = [];


  ngOnInit(): void {
    this.createChart();
    setTimeout(() => {  this.getDataFromApi(this.thing_id); }, 100);
  }


  
  public chart: any;

  createChart() {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
    // const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data

    
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: 'Idle Time',
            data: this.yAxisData,
            backgroundColor: 'blue',
          },
          {
            label: 'Active Time',
            data: this.yAxisData2,
            backgroundColor: 'red',
          }
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
    this.dashboardService.getSpentTime(thing_id).subscribe(
      (data:any) => {
        // Process the data returned from the API
        this.xAxisLabels = data[0];
        this.yAxisData = data[1];
        this.yAxisData2 = data[2];


            // Update the chart with the new data
    this.chart.data.labels = this.xAxisLabels;
    this.chart.data.datasets[0].data = this.yAxisData;
    this.chart.data.datasets[1].data = this.yAxisData2;
    this.chart.update();


      },
      (error:any) => {
        // Handle any errors that occur during the API call
        console.error(error);
      }
    );
  }


  updateDashboard(mode:string,thing_id:any) {

    if(mode=='yearly') {
      this.dashboardService.getSpentTime(thing_id).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
          this.yAxisData2 = data[2];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
              this.chart.data.datasets[1].data = this.yAxisData2;
      this.chart.update();
  
  
        },
        (error:any) => {
          // Handle any errors that occur during the API call
          console.error(error);
        }
      );

    
    }else if(mode=='monthly') {
      this.dashboardService.getSpentTimeMonths(thing_id).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
          this.yAxisData2 = data[2];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
              this.chart.data.datasets[1].data = this.yAxisData2;
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
      this.dashboardService.getSpentTimeDays(thing_id).subscribe(
        (data:any) => {
          // Process the data returned from the API
          this.xAxisLabels = data[0];
          this.yAxisData = data[1];
          this.yAxisData2 = data[2];
  
              // Update the chart with the new data
              this.chart.data.labels = this.xAxisLabels;
              this.chart.data.datasets[0].data = this.yAxisData;
              this.chart.data.datasets[1].data = this.yAxisData2;
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
