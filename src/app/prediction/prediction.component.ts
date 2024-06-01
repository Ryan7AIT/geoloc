import { CarServiceService } from '../car-service.service';
import { CommonModule } from '@angular/common';
import { RealtimefuelComponent } from '../realtimefuel/realtimefuel.component';
import { RealtimebatteryComponent } from '../realtimebattery/realtimebattery.component';
import { RealtimeoilComponent } from '../realtimeoil/realtimeoil.component';
import { RealtimespeedComponent } from '../realtimespeed/realtimespeed.component';
import { FormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionService } from '../prediction.service';



@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule,RealtimefuelComponent,RealtimebatteryComponent,RealtimeoilComponent,RealtimespeedComponent, FormsModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {

  constructor(private carService: CarServiceService,private route: ActivatedRoute, private predcitionService: PredictionService) {}

  public thing_id:any


  public car:any= {};
  public oilvalue:number=0;
  public fuelLevel:number=0;
  public battery:number=0;
  public prediction = 'Normal';
  public rul! : number;
  public autoMaintenanceActive = true;
  public rulPercentage! : number;

  ngOnInit(): void {

    this.thing_id = this.route.snapshot.paramMap.get('thing_id');
    console.log(this.thing_id); // This will log the thing_id to the console


    this.getRealtimeinfo(1599);


    // excecute this functin every 2 second
    setInterval(() => {
      this.getRealtimeinfo(this.thing_id);
    }, 10000);


  }


  getFuelLevelStyle() {
    const percentage = this.fuelLevel / 100;
    const rotation = percentage * 360;
    const color = this.fuelLevel < 20 ? '#F97316' : '#10B981'; // Use orange color if fuelLevel is more than 80, otherwise use green
    return {
      'background': `conic-gradient(${color} 0% ${rotation}deg, #D1D5DB ${rotation}deg)`,
      'clip-path': 'circle(50% at 50% 50%)'
    };
  }

  getOilValueStyle() {
    const percentage = this.oilvalue / 6;
    const rotation = percentage * 360;
    const color = this.oilvalue < 3 ? '#F97316' : '#10B981'; // Use orange color if fuelLevel is more than 80, otherwise use green
    return {
      'background': `conic-gradient(${color} 0% ${rotation}deg, #D1D5DB ${rotation}deg)`,
      'clip-path': 'circle(50% at 50% 50%)'
    };
  }

  getBatteryStyle() {
    
    const percentage = this.battery / 6;
    const rotation = percentage * 360;
    const color = this.battery < 2 ? '#F97316' : '#10B981'; // Use orange color if fuelLevel is more than 80, otherwise use green
    return {
      'background': `conic-gradient(${color} 0% ${rotation}deg, #D1D5DB ${rotation}deg)`,
      'clip-path': 'circle(50% at 50% 50%)'
    };
  }



getRealtimeinfo(car: any) {

  this.carService.getThing(car).subscribe((data: any) => {
    
    
  
    this.car = data[0]
    
  
    
    
    this.oilvalue = this.car.oil_value
    this.fuelLevel = this.car.fuel_percent;
    this.battery = this.car.battery;
    
    this.getFuelLevelStyle();
    this.getOilValueStyle();
    this.getBatteryStyle(); 
    
  }
  );


  this.carService.getPrediction(car).subscribe((data: any) => {

    this.rul = data[0].rul;

    if(this.rul < 5){

      this.rulPercentage = 100;

      this.predcitionService.addCarToMaintenance(this.car).subscribe((data: any) => {
        console.log(data)
      }
      );



    }else if (this.rul > 2000){
      this.rulPercentage = 20;
    } else if (this.rul > 100 && this.rul < 500){
      this.rulPercentage = 40
    }else {
      this.rulPercentage = 60
    }
    
    if(data[0].prediction == 0){
      this.prediction = 'Normal'
    }else if(data[0].prediction == 1){
      this.prediction = 'Warning'
    }else if(data[0].prediction == 2){
      this.prediction = 'Critical'
    }
    
  })
    



}

}