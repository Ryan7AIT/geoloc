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
    this.getAllCras();
  }

  currentTable: string = 'table1';

  showTable(table: string) {
    this.currentTable = table;
  }

  constructor(private carService: CarServiceService) { }

  searchTerm: string = '';
  cars: any[] = []
  allcars: any[] = []
  allcars2: any[] = []


  filteredCars!: any ;
  filteredAllCars!: any ;
  filteredAllCars2!: any ;




  filterCars(): void {
    this.filteredCars = this.cars.filter(car =>
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // car.registrationNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  filterAllCars(): void {
    this.filteredAllCars = this.allcars2.filter(car =>
      car.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // car.registrationNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  scheduleMaintenance(car: Car): void {
    // Implement the logic to schedule maintenance
    console.log(`Scheduling maintenance for ${car.name}`);
  }

  public page = 1;

  public getCras() {
    this.carService.getCarsML().subscribe((data: any) => {
      this.cars = data;
      this.filteredCars = this.cars;
      
    });
  }


  public getAllCras() {
    this.carService.getCarsAll(this.page).subscribe((data: any) => {
      console.log(data);
      
      this.allcars = data;
      this.filteredAllCars = this.allcars;
      
    });


    this.carService.getCarsAll2(this.page).subscribe((data: any) => {
      console.log(data);
      
      this.allcars2 = data;
      this.filteredAllCars2 = this.allcars2;

      console.log(this.allcars2[0].name);
      
      
    });
  }



  public delete(thing_id: any) {
    this.carService.deleteCar(thing_id).subscribe((data: any) => {
      this.getCras();
    } );
  
  
  }





}
