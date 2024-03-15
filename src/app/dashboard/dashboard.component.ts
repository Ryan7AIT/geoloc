import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from '../map/map.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent,MapComponent, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{

  data: any;

  constructor(private dataService: DashboardService) {}

  ngOnInit() {
    // this.dataService.getDataFromApi().subscribe(
    //   (response:any) => {
    //     this.data = response;
    //     console.log('Received data from API:', this.data);
    //   },
    //   (error) => {
    //     console.error('Error fetching data from API:', error);
    //   }
    // );
  }

}

