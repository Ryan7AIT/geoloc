import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-avg-max-speed-chart',
  standalone: true,
  imports: [],
  templateUrl: './avg-max-speed-chart.component.html',
  styleUrl: './avg-max-speed-chart.component.css'
})
export class AvgMaxSpeedChartComponent {

  constructor(private dashboardService: DashboardService) {}
  public thing_id = 0;  


  public chart: any = null;
  public xAxisLabels: string[] = [];
  public yAxisData: number[] = [];
  public yAxisData2: number[] = [];

  ngOnInit(): void {
    this.createChart();
    setTimeout(() => {  this.getDataFromApi(this.thing_id); }, 150);

  }


  // public avgSpeedData: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  public maxSpeedData: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
// 
  public selectedDay: number = 0;

  createChart() {
    // const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20'];
    // const visibleDays = days.slice(0, 6);
    // const avgSpeedData = this.avgSpeedData.slice(this.selectedDay, this.selectedDay + 6);
    // const maxSpeedData = this.maxSpeedData.slice(this.selectedDay, this.selectedDay + 6);

    this.chart = new Chart('MyChart3', {
      type: 'line',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: 'Average Speed',
            data: this.yAxisData,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Maximum Speed',
            data: this.yAxisData2,
            borderColor: 'red',
            fill: false
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

  previousDay() {
    if (this.selectedDay > 0) {
      this.selectedDay--;
      // this.updateChart();
    }
  }

  nextDay() {
    if (this.selectedDay < 14) {
      this.selectedDay++;
      // this.updateChart();
    }
  }

  // updateChart() {
  //   const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20'];
  //   const visibleDays = days.slice(this.selectedDay, this.selectedDay + 6);
  //   const avgSpeedData = this.avgSpeedData.slice(this.selectedDay, this.selectedDay + 6);
  //   const maxSpeedData = this.maxSpeedData.slice(this.selectedDay, this.selectedDay + 6);

  //   this.chart.data.labels = visibleDays;
  //   this.chart.data.datasets[0].data = avgSpeedData;
  //   this.chart.data.datasets[1].data = maxSpeedData;
  //   this.chart.update();
  // }
  
  

  getDataFromApi(thing_id: number) {
    // Call the appropriate method from the dashboard service to fetch data from the API endpoint
    this.dashboardService.getSpeed(thing_id).subscribe(
      (data:any) => {
        // Process the data returned from the API
        

        
        this.xAxisLabels = data[0];
        this.yAxisData = data[1];
        this.yAxisData2 = data[2];


            // Update the chart with the new data
    this.chart.data.labels = data[0];
    this.chart.data.datasets[0].data = data[1];
    this.chart.data.datasets[1].data = data[2];
    this.chart.update();


      },
      (error:any) => {
        // Handle any errors that occur during the API call
        console.error(error);
      }
    );
  }




  updateDashboard(mode:string,thing_id:any,year?:number,month?:number) {

    if(mode=='yearly') {
      this.dashboardService.getSpeed(thing_id).subscribe(
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
      this.dashboardService.getSpeedMonth(thing_id,year as number).subscribe(
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
      this.dashboardService.getSpeedDays(thing_id, year as number, month as number).subscribe(
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
