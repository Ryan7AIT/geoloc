import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-distance-chart',
  standalone: true,
  imports: [],
  templateUrl: './distance-chart.component.html',
  styleUrl: './distance-chart.component.css'
})
export class DistanceChartComponent {

  constructor(private httpClient: HttpClient,private dashboardService: DashboardService) {}
  public thing_id = 0;  


  public chart: any;
  public xAxisLabels: string[] = [];
  public yAxisData: number[] = [];
  public xAxisType: 'month' | 'year' | 'day' = 'month';

  ngOnInit(): void {
    
    this.createChart();

    setTimeout(() => {
      this.getDataFromApi(this.thing_id);

    }, 50);


  }


  getDataFromApi(thing_id: number) {
    // Call the appropriate method from the dashboard service to fetch data from the API endpoint
    this.dashboardService.getDistanceTravlledYears(thing_id).subscribe(
      (data:any) => {
        // Process the data returned from the API
        this.xAxisLabels = data[0];
        this.yAxisData = data[1];


            // Update the chart with the new data
    this.chart.data.labels = data[0];
    this.chart.data.datasets[0].data = data[1];
    this.chart.update();


      },
      (error:any) => {
        // Handle any errors that occur during the API call
        console.error(error);
      }
    );
  }

  createChart() {
    this.chart = new Chart("MyChart212", {
      type: 'bar',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: "Distance Traveled",
            data: this.yAxisData,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  


  updateDashboard(mode:string,thing_id:any) {

    if(mode=='yearly') {

      this.dashboardService.getDistanceTravlledYears(thing_id).subscribe(
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

    
    }else if(mode=='monthly') {
      this.dashboardService.getDistanceTravlledMonth(thing_id).subscribe(
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
    else if(mode=='daily') {
      this.dashboardService.getDistanceTravlledDays(thing_id).subscribe(
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
