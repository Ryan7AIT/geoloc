import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { PredictionService } from '../prediction.service';
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-realtimeoil',
  standalone: true,
  imports: [],
  templateUrl: './realtimeoil.component.html',
  styleUrl: './realtimeoil.component.css'
})
export class RealtimeoilComponent {


  

  
    public xAxisLabels: string[] = [];
    public yAxisData: number[] = [];
  
  
    constructor(private predictionService: PredictionService) {}
  
    ngOnInit(): void {

      this.createChart();
      this.getDataFromApi();

      setInterval(() => {  this.getDataFromApi(); }, 10000);
      
      // for (let i = 0; i < 60; i++) {
      //   this.yAxisData.push(Math.random() * (5 - 2) + 2);
      // }
    }

    
  
    public chart: any;
  
    createChart() {
      // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
      // const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data
  
      
      this.chart = new Chart('MyChart12', {
        type: 'line',
        data: {
          labels: this.xAxisLabels,
          datasets: [
            {
              label: 'OIL VALUE',
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
          },
          plugins: {
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin:10,
                  yMax: 10,
                  borderColor: 'red',
                  borderWidth: 2,
                  borderDash: [4, 4],
                  label: {
                    color: 'red',
                    content: 'Threshold',
                    position: 'start',
                    display: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderDash: [4, 4],
                  }
  
                },
                line2: {
                  type: 'line',
                  yMin:1,
                  yMax: 1,
                  borderColor: 'red',
                  borderWidth: 2,
                  borderDash: [4, 4],
 
  
                },
              },
            },
          },
        }
      });
    }
  

    getDataFromApi() {
      // Call the appropriate method from the dashboard service to fetch data from the API endpoint
      this.predictionService.getOilData().subscribe(
        (data:any) => {
          
          // Process the data returned from the API

          this.xAxisLabels = data[1].reverse();
          this.yAxisData = data[0].reverse();
  
  
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
  
  
  
  
    
  


