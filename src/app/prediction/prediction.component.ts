import { Component } from '@angular/core';
import { CarServiceService } from '../car-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {

  constructor(private carService: CarServiceService) {}
  public car:any= {};

  ngOnInit(): void {


    // excecute this functin every 2 second
    setInterval(() => {
      this.getRealtimeinfo(629);
    }, 2000);


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

getRealtimeinfo(car: any) {

  this.carService.getThing(car).subscribe((data: any) => {
    console.log('from iothing');
    console.log(data);
    this.car = data[0]
    this.getFuelLevelStyle();
    this.fuelLevel = this.car.speed
    
  }
  );
}

}