import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-avg-max-speed-chart',
  standalone: true,
  imports: [],
  templateUrl: './avg-max-speed-chart.component.html',
  styleUrl: './avg-max-speed-chart.component.css'
})
export class AvgMaxSpeedChartComponent {

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any = null;

  public avgSpeedData: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
  public maxSpeedData: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

  public selectedDay: number = 0;

  createChart() {
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20'];
    const visibleDays = days.slice(0, 6);
    const avgSpeedData = this.avgSpeedData.slice(this.selectedDay, this.selectedDay + 6);
    const maxSpeedData = this.maxSpeedData.slice(this.selectedDay, this.selectedDay + 6);

    this.chart = new Chart('MyChart3', {
      type: 'line',
      data: {
        labels: visibleDays,
        datasets: [
          {
            label: 'Average Speed',
            data: avgSpeedData,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Maximum Speed',
            data: maxSpeedData,
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
      this.updateChart();
    }
  }

  nextDay() {
    if (this.selectedDay < 14) {
      this.selectedDay++;
      this.updateChart();
    }
  }

  updateChart() {
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20'];
    const visibleDays = days.slice(this.selectedDay, this.selectedDay + 6);
    const avgSpeedData = this.avgSpeedData.slice(this.selectedDay, this.selectedDay + 6);
    const maxSpeedData = this.maxSpeedData.slice(this.selectedDay, this.selectedDay + 6);

    this.chart.data.labels = visibleDays;
    this.chart.data.datasets[0].data = avgSpeedData;
    this.chart.data.datasets[1].data = maxSpeedData;
    this.chart.update();
  }
  
  


}
