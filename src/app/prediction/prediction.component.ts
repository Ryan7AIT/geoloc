import { Component } from '@angular/core';
import { CarServiceService } from '../car-service.service';
import { CommonModule } from '@angular/common';
import { RealtimefuelComponent } from '../realtimefuel/realtimefuel.component';
import { RealtimebatteryComponent } from '../realtimebattery/realtimebattery.component';
import { RealtimeoilComponent } from '../realtimeoil/realtimeoil.component';
import { RealtimespeedComponent } from '../realtimespeed/realtimespeed.component';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule,RealtimefuelComponent,RealtimebatteryComponent,RealtimeoilComponent,RealtimespeedComponent],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {

  constructor(private carService: CarServiceService) {}
  public car:any= {};
  public oilvalue:number=0;

  ngOnInit(): void {


    // excecute this functin every 2 second
    setInterval(() => {
      this.getRealtimeinfo(627);
    }, 10000);


  }


  fuelLevel = 12; // This is your fuel level variable
  getFuelLevelStyle() {
    const percentage = this.fuelLevel / 100;
    const rotation = percentage * 360;
    const color = this.fuelLevel > 80 ? '#F97316' : '#10B981'; // Use orange color if fuelLevel is more than 80, otherwise use green
    return {
      'background': `conic-gradient(${color} 0% ${rotation}deg, #D1D5DB ${rotation}deg)`,
      'clip-path': 'circle(50% at 50% 50%)'
    };
  }

  getOilValueStyle() {
    const percentage = this.oilvalue / 5;
    const rotation = percentage * 360;
    const color = this.oilvalue < 3 ? '#F97316' : '#10B981'; // Use orange color if fuelLevel is more than 80, otherwise use green
    return {
      'background': `conic-gradient(${color} 0% ${rotation}deg, #D1D5DB ${rotation}deg)`,
      'clip-path': 'circle(50% at 50% 50%)'
    };
  }



getRealtimeinfo(car: any) {

  this.carService.getThing(car).subscribe((data: any) => {
  
    this.car = data[0]
    console.log(data[0]);
    
    this.oilvalue = this.car.oil_value
    
    this.getFuelLevelStyle();
    this.getOilValueStyle();
    this.fuelLevel = this.car.speed
    
  }
  );
}

}