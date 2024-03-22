import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgIf } from '@angular/common';
import { ContainerComponent } from '../container/container.component';

import { CarServiceService } from '../car-service.service';
@Component({
  selector: 'app-real-time-stats',
  standalone: true,
  imports: [MapComponent,SidebarComponent,ContainerComponent, NgIf],
  templateUrl: './real-time-stats.component.html',
  styleUrl: './real-time-stats.component.css'
})


export class RealTimeStatsComponent {

  constructor(private carService: CarServiceService) {}

  public car = []

  ngOnInit(): void {
    this.getSelectedCar(629);
  }


  public selectedCar: any;

   showSidebar = false;

     addItem(newItem: string) {
    console.log(newItem);


    this.showSidebar = !this.showSidebar ;
    
    
  }

  // get selected card from api
  getSelectedCar(car: any) {
    this.selectedCar = car;

    this.carService.getThing(car).subscribe((data: any) => {
      console.log(data);
      this.car = data;
    } );

    
  }

  onClose() {
    this.showSidebar = false;
  }

}
