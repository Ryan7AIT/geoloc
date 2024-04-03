import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-alert-chart',
  standalone: true,
  imports: [],
  templateUrl: './alert-chart.component.html',
  styleUrl: './alert-chart.component.css'
})
export class AlertChartComponent {

  constructor(private dashboardService: DashboardService) {}
  public thing_id = 0;  

  public xAxisLabels: string[] = ['alert','simple','haut'];
  public xAxisLabels2: string[] = ['sep','oct','nov','dec','jan','feb','mar','apr','may','jun'];
  public yAxisData: string[] = [];
  public yAxisData2: number[] = [10,5,2,5,10,12,15,7,10,25];
  public yAxisData3: number[] = [1,5,2,5,6,12,5,7,10,4];
  public chart: any;
  public chart2: any;



  ngOnInit(): void {
    this.createChart();
    setTimeout(() => {  this.getDataFromApi(this.thing_id); }, 300);
  }



  createChart() {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
    // const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data

    
    this.chart = new Chart('MyChart5', {
      type: 'bar',
      data: {
        labels: this.xAxisLabels,
        datasets: [
          {
            label: 'number of alers',
            data: this.yAxisData,
            backgroundColor: 'rgba(4, 120, 228, 0.871)',
          },

        ]
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y',
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



    this.chart2 = new Chart('MyChart6', {
      type: 'line',
      data: {
        labels: this.xAxisLabels2,
        datasets: [
          {
            label: 'type1',
            data: this.yAxisData2,
            backgroundColor: 'blue',
          },
          {
            label: 'type2',
            data: this.yAxisData3,
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
    this.dashboardService.getAlerts(thing_id).subscribe((data: any) => {
      this.xAxisLabels = data[0];
      // this.yAxisData = data[1];

                  // Update the chart with the new data
    // this.chart.data.labels = data[0];
    this.chart.data.datasets[0].data = data[1];
     this.chart.update();


  
      
    });
  }


}
