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
  public selectedCarId = {};

  ngOnInit(): void {


    // excecute this functin every 2 second
    setInterval(() => {
      this.getSelectedCar(629);
    }, 2000);


  }


  public selectedCar: any;

   showSidebar = false;

     addItem(newItem: string) {


    this.showSidebar = !this.showSidebar ;
    
    
  }

  // get selected card from api
  getSelectedCar(car: any) {
    console.log('from getSelectedCar');
    
    this.selectedCar = car;

    this.carService.getThing(car).subscribe((data: any) => {
      console.log('from iothing');

      this.selectedCarId = data[0];
      
      
    } );

    
  }

  onClose() {
    this.showSidebar = false;
  }

}
