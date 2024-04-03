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

  public xAxisLabels: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  public yAxisData: number[] = [400, 300, 400, 600, 700, 800, 900, 500, 300, 400, 600, 700];


  ngOnInit(): void {
    this.createChart();
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


}
