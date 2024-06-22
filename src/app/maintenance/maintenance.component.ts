import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarServiceService } from '../car-service.service';

interface Car {
  name: string;
  registrationNumber: string;
  lastMaintenanceDate: Date;
  predictedRUL: number;
}

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent implements OnInit {

  ngOnInit() {
    this.getCras();
  }

  constructor(private carService: CarServiceService) { }

  searchTerm: string = '';
  cars: any[] = []
  filteredCars!: any ;


  filterCars(): void {
    this.filteredCars = this.cars.filter(car =>
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // car.registrationNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  scheduleMaintenance(car: Car): void {
    // Implement the logic to schedule maintenance
    console.log(`Scheduling maintenance for ${car.name}`);
  }


  public getCras() {
    this.carService.getCarsML().subscribe((data: any) => {
      console.log(data);
      this.cars = data;
      this.filteredCars = this.cars;
      
    });
  }


  public delete(thing_id: any) {
    this.carService.deleteCar(thing_id).subscribe((data: any) => {
      this.getCras();
    } );
  
  
  }





}
