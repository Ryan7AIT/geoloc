


import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-distance-chart',
  standalone: true,
  imports: [],
  templateUrl: './distance-chart.component.html',
  styleUrl: './distance-chart.component.css'
})
export class DistanceChartComponent {

  constructor(private httpClient: HttpClient) {}


  public chart: any;
  public xAxisLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public yAxisData: number[] = [100, 567,123, 200, 300, 400, 500, 200, 600, 700,499, 1000];
  public xAxisType: 'month' | 'year' | 'day' = 'month';

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart2", {
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


  updateYAxisData(inputType: 'year' | 'month' | 'day') {
    // Make an HTTP request to the API to get the updated data based on the input type
    // Replace the URL with the actual API endpoint
    const apiUrl = 'https://api.example.com/data';
    // Make the HTTP request using your preferred method (e.g., HttpClient in Angular)
    // and pass the input type as a query parameter or in the request body
    // Example using HttpClient in Angular:
    this.httpClient.get(apiUrl, { params: { inputType } }).subscribe((response: any) => {
      // Update the yAxisData based on the response from the API
      this.yAxisData = response.data;
      // Update the chart with the new data
      this.chart.data.datasets[0].data = this.yAxisData;
      this.chart.update();
    });
  }

  updateChart() {
    // Update the xAxisLabels and yAxisData based on your desired logic
    this.xAxisLabels = ['August', 'September', 'October', 'November', 'December'];
    this.yAxisData = [800, 900, 1000, 1100, 1200];

    // Update the chart with the new data
    this.chart.data.labels = this.xAxisLabels;
    this.chart.data.datasets[0].data = this.yAxisData;
    this.chart.update();
  }
};


