import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-car-utilization',
  standalone: true,
  imports: [],
  templateUrl: './car-utilization.component.html',
  styleUrl: './car-utilization.component.css'
})
export class CarUtilizationComponent {

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  createChart() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
    const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Idle Time',
            data: idleTimeData,
            backgroundColor: 'blue',
          },
          {
            label: 'Active Time',
            data: activeTimeData,
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

}
