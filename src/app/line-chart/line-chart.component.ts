import { Component } from '@angular/core';
// import {Chart} from 'chart.js';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
                 '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  
    // Function to add new data to the chart
    const addNewData = () => {
      // Generate random data for demonstration
      const randomSalesValue = Math.floor(Math.random() * 1000);
      // const randomProfitValue = Math.floor(Math.random() * 1000);
  
      // Update datasets with new data
      this.chart.data.datasets[0].data.push(randomSalesValue);
      // this.chart.data.datasets[1].data.push(randomProfitValue);
  

  
      // Limit the number of data points shown to maintain performance
      const maxDataPoints = 10; // Adjust according to your preference
      if (this.chart.data.labels.length > maxDataPoints) {
        this.chart.data.labels.shift(); // Remove the first label
        this.chart.data.datasets.forEach((dataset:any) => {
          dataset.data.shift(); // Remove the first data point for each dataset
        });
      }

            // Update labels with new date (assuming you want to keep adding dates)
            const lastDate = this.chart.data.labels[this.chart.data.labels.length - 1];
            const nextDate = new Date(new Date(lastDate).getTime() + 86400000); // Add one day
            this.chart.data.labels.push(nextDate.toISOString().slice(0, 10));
  
      // Update the chart
      this.chart.update();
    };
  
    // Call addNewData every 2 seconds
    setInterval(addNewData, 2000);
  }
  
}
