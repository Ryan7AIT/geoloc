import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class MaintenanceComponent {

  searchTerm: string = '';
  cars: Car[] = [
    { name: 'Car A', registrationNumber: 'ABC123', lastMaintenanceDate: new Date('2024-01-01'), predictedRUL: 120 },
    { name: 'Car B', registrationNumber: 'XYZ456', lastMaintenanceDate: new Date('2024-03-15'), predictedRUL: 90 },
    { name: 'Car C', registrationNumber: 'DEF789', lastMaintenanceDate: new Date('2024-06-01'), predictedRUL: 60 },
    // Add more cars as needed
  ];
  filteredCars: Car[] = [...this.cars];


  filterCars(): void {
    this.filteredCars = this.cars.filter(car =>
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.registrationNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  scheduleMaintenance(car: Car): void {
    // Implement the logic to schedule maintenance
    console.log(`Scheduling maintenance for ${car.name}`);
  }



}
