import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-realtimefuel',
  standalone: true,
  imports: [],
  templateUrl: './realtimefuel.component.html',
  styleUrl: './realtimefuel.component.css'
})
export class RealtimefuelComponent {

  public xAxisLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23',
  '24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46',
  '47','48','49','50','51','52','53','54','55','56','57','58','59','60'];
  public yAxisData: number[] = [];


  constructor() {}

  ngOnInit(): void {
    this.createChart();
    
    for (let i = 0; i < 60; i++) {
      this.yAxisData.push(Math.random() * (5 - 2) + 2);
    }
  }

  public chart: any;

  createChart() {
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const idleTimeData = [50, 30, 40, 60, 70, 80, 90, 50, 30, 40, 60, 70]; // Replace with your actual idle time data
    // const activeTimeData = [50, 70, 60, 40, 30, 20, 10, 50, 70, 60, 40, 30]; // Replace with your actual active time data

    
    this.chart = new Chart('MyChart10', {
      type: 'line',
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
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin:9,
                yMax: 9,
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
            },
          },
        },
      }
    });
  }



}




  
