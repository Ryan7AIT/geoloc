import { Component, OnInit, ViewChild } from '@angular/core';
import { BiMapComponent } from '../bi-map/bi-map.component';
import { DistanceChartComponent } from '../distance-chart/distance-chart.component';
import { MapComponent } from '../map/map.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContainerComponent } from '../container/container.component';
import { AvgMaxSpeedChartComponent } from '../avg-max-speed-chart/avg-max-speed-chart.component'; 
import { CarServiceService } from '../car-service.service';
import { CarUtilizationComponent } from '../car-utilization/car-utilization.component';
import { CommonModule, NgIf } from '@angular/common';
import { FuelChartComponent } from '../fuel-chart/fuel-chart.component';
import { AlertChartComponent } from '../alert-chart/alert-chart.component';
import { RoundNumPipe } from '../round-num.pipe';
import { TimePipe } from '../time.pipe';
import { DashboardService } from '../dashboard.service';
import { FormsModule } from '@angular/forms';


import * as L from 'leaflet';
import 'leaflet.fullscreen';


@Component({
  selector: 'app-bi',
  standalone: true,
  imports: [BiMapComponent,FormsModule,DistanceChartComponent,MapComponent,SidebarComponent,ContainerComponent,NgIf,AvgMaxSpeedChartComponent,CommonModule,CarUtilizationComponent,FuelChartComponent,AlertChartComponent,RoundNumPipe,TimePipe],

  templateUrl: './bi.component.html',
  styleUrl: './bi.component.css'
})
export class BiComponent implements OnInit {
  @ViewChild(DistanceChartComponent) distanceChartComponent!: DistanceChartComponent;
  @ViewChild(CarUtilizationComponent) carUtilizationComponent!: CarUtilizationComponent;
  @ViewChild(AvgMaxSpeedChartComponent) avgMaxSpeedChartComponent!: AvgMaxSpeedChartComponent;
  @ViewChild(FuelChartComponent) fuelChartComponent!: FuelChartComponent;
  @ViewChild(AlertChartComponent) alertChartComponent!: AlertChartComponent;

  public type = 'type0';
  public group = 'group0';

  public map!: L.Map ;
  public car = []
  public cars:any = []

  public selectedCarId = 0;
  public selectedCar:any ;
  public carTypes = [];
  public carGroups: any = [];
  carMarkers:any = [];
  path:any = null;
  public showSidebar = false;
  public page = 1;
  public startP = 1
  public endP = 5


  public monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



  public showMonth = false;
  public thing_id = 0;  
  public group_id = 0;
  public type_id = 0;
  public searchResults:any = [];
  public thing: any;
  public fleet = 'My fleet';
  public date = '';
  public time = 'yearly';
  public year = 2024;
  public numberofthings!:number;
  public numberofactivethings! : number;
  public carPositions:any = [];

  public currentDate = new Date();
    
  // Extract the month number from the current date (months are zero-based, so January is 0)
  public currentMonthNumber = this.currentDate.getMonth() ; // Adding 1 to adjust for zero-based indexing


  public month =  this.currentMonthNumber;

  


  ngOnInit() {
    // this.getCars();

      setInterval(() => {
    this.getSelectedCar(this.selectedCarId);
  }, 2000);
     

    setInterval(() => {
      this.getCars();
    }, 2000);


    // setTimeout(() => {
    this.initializeMap();
      
    // }, 1000);
    this.getJourneys();
    this.getNumberOfVehicles()
    this.getTypes();
    this.getGroups();
    this.getJourneyNumbers();
    this.getActiveVehicles();
  
  }




  constructor(private carService: CarServiceService,private dashboardService: DashboardService) { }



  public nextYear() {
    this.year = this.year + 1;
    this.date = this.year.toString();
    this.updateDashboard();
  }

  public prevYear() {
    this.year = this.year - 1;
    this.date = this.year.toString();
    this.updateDashboard();
  }

  public nextMonth() {
    this.month = this.month + 1;
    this.date = this.monthNames[this.month] + ' 2024';
    this.updateDashboard();
  }

  public prevMonth() {
    this.month = this.month - 1;
    this.date = this.monthNames[this.month] + ' 2024';
    this.updateDashboard();
  }

  public initializeMap() {
    this.map = L.map('map', {
      fullscreenControl: true,  // Add this option to enable the fullscreen control
    } as L.MapOptions).setView([28.0339, 1.6596], 5); // Set the initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19  // Increase maxZoom to allow deeper zooming
    }).addTo(this.map);

    var algeriaBounds = L.latLngBounds(
      L.latLng(18.96, -8.67), // Southwest coordinates
      L.latLng(37.09, 11.98)  // Northeast coordinates
    );

    this.map.setMaxBounds(algeriaBounds);

    this.map.on('drag', () => {
        this.map.panInsideBounds(algeriaBounds, { animate: false });
    });

      //   // Add event listeners for entering and exiting fullscreen
      //   this.map.on('enterFullscreen', () => {
      //     this.map.setZoom(2);  // Set a higher zoom level for fullscreen
      // });
  
      this.map.on('exitFullscreen', () => {
          this.map.setZoom(5);  // Reset to the original zoom level
      });

    // Add any additional map layers or markers here

    document.addEventListener('fullscreenchange', () => {
      this.map.invalidateSize();
  });


      // List of car positions
    //   var carPositions = [
    //     { lat: 28.0339, lng: 1.6596 },
    //     { lat: 29.0339, lng: 2.6596 },
    //     // Add more positions here
    // ];



    let carIcon = L.icon({
      iconUrl: './../../assets/gps-navigation.png', // URL to your car icon image
      iconSize: [35, 35], // size of the icon
      iconAnchor: [18, 18], // point of the icon which will correspond to marker's location
    });
    const markerOptions = {
      title: 'Marker',
      icon: carIcon ,
      draggable: true,
      

    };



    

        // Add a marker for each car position
        // for (let position of this.carPositions) {
        //   var m = L.marker([position.lat, position.lng], markerOptions).addTo(this.map).on('click', this.onMarker.bind(this));
        //   this.carMarkers.push(m);
        // }


        
          // console.log('aaa');
          // console.log(this.cars);
          
          



        // Define the path and store it in the path variable
        // var pathCoordinates: L.LatLngExpression[] = [
        //   [28.0339, 1.6596],
        //   [29.0339, 2.6596],
        //   // Add more coordinates here
        // ];
        // this.path = L.polyline(pathCoordinates, { color: 'red' });
      


      
}

public getLastStat() {

  this.showSidebar = true;
  this.carService.getCars(this.selectedCarId).subscribe((data: any) => {
    
    
    
  } );
}

public getCarsWrong() {

  this.carService.getMapInfo().subscribe((data: any) => {
    this.cars = data;

    
    this.carPositions = data.map((item:any) => ({
      lat: item.latitude,
      lng: item.longitude
    }));

    let carIcon = L.icon({
      iconUrl: './../../assets/gps-navigation.png', // URL to your car icon image
      iconSize: [35, 35], // size of the icon
      iconAnchor: [18, 18], // point of the icon which will correspond to marker's location
    });
    const markerOptions = {
      title: 'Marker',
      icon: carIcon ,
      draggable: true,
      

    };


    for (let item of this.cars) {
      let marker = L.marker([item.latitude, item.longitude],markerOptions).addTo(this.map);
      marker.on('click', () => {
        this.selectedCar = item;

  this.selectedCarId = item.thing_id;

  // setInterval(() => {
  //   this.getSelectedCar(this.selectedCarId);
  // }, 2000);




        // this.getLastStat();

      });
    }

    

    

    
  } );



}


public getCars() {
  this.carService.getMapInfo().subscribe((data: any) => {
    this.cars = data;
    


    this.carPositions = data.map((item:any) => ({
      lat: item.latitude,
      lng: item.longitude
    }));

    let carIcon = L.icon({
      iconUrl: './../../assets/gps-navigation.png', // URL to your car icon image
      iconSize: [35, 35], // size of the icon
      iconAnchor: [18, 18], // point of the icon which will correspond to marker's location
    });
    const markerOptions = {
      title: 'Marker',
      icon: carIcon ,
      draggable: true,
    };

    // Remove the old markers from the map
    for (let marker of this.carMarkers) {
      marker.removeFrom(this.map);
    }

    // Clear the carMarkers array
    this.carMarkers = [];

    for (let item of this.cars) {
      let marker = L.marker([item.latitude, item.longitude],markerOptions).addTo(this.map);
      marker.on('click', () => {
        
        this.selectedCar = item;
        this.selectedCarId = item.thing_id;
        this.showSidebar = true;
      });

      // Add the new marker to the carMarkers array
      this.carMarkers.push(marker);
    }
  });
}


onButtonClick(path: any) {


      // Parse the path string into an array of coordinates
      var pathCoordinates = path.split(';').map((coordinate:any )=> {
        var [lat, lng] = coordinate.split(',');
        return [parseFloat(lat), parseFloat(lng)];
    });

    // If the path is on the map, remove it and add the car markers
    if (this.path && this.map.hasLayer(this.path)) {
        this.path.removeFrom(this.map);
        for (let marker of this.carMarkers) {
            marker.addTo(this.map);
        }
        this.path = null;
    }
    // If the path is not on the map, create a new path, add it, and remove the car markers
    else {
        this.path = L.polyline(pathCoordinates, { color: 'red' }).addTo(this.map);
        for (let marker of this.carMarkers) {
            marker.removeFrom(this.map);
        }
    }


        // Move the map to the path
        this.map.fitBounds(this.path.getBounds());

}

private onMarker(event: any) {
  const marker = event.target;
  this.showSidebar = !this.showSidebar ;

  


  
  // const markerId = this.markers.indexOf(marker);


  
  // this.newItemEvent.emit(`Marker ID: ${this.cars[markerId][1]}`);
}


  // get selected card from api
  getSelectedCar(car: any) {
    
    
      
    this.selectedCar = car;

    this.carService.getThing(this.selectedCarId).subscribe((data: any) => {
      

      this.selectedCar = data[0]
      // this.selectedCarId = data[0];

      
      
      
    } );

    
  }

  onClose() {
    this.showSidebar = false;
  }


  updateDash(event?: any) {

    if(event.target.value == 'type0') {
      this.type_id = 0
    }

    if(event.target.value == 'type1') {
      this.type_id = 1
    }

    if (event.target.value == 'type2') {
      this.type_id = 2
    }

    if (event.target.value == 'type3') {
      this.type_id = 3
    }

    this.updateDashboard()
  }

  updateDash2(event?: any) {
    this.group_id = event.target.value
    this.updateDashboard()
  }

  updateDashboard(event?: any) {

    // check if event is passed
    if(!event) {
      
    }else {
      this.time = event.target.value;

    }

    


    



    



    if( this.time== 'yearly') {
      this.distanceChartComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);
      // set 0.5 timeout
      // setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);
      // }, 100);

      // setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);
      // }, 150);

        this.fuelChartComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);

        this.alertChartComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);

      this.date = '';


    }


    if(this.time == 'monthly') {

      this.date = this.year.toString();



      this.distanceChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      // setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      // }, 100);     
      
      // setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      // }, 150);

      this.fuelChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);

      this.alertChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);

      
    }

    if(this.time == 'daily') {


      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
          let currentDate = new Date();
    
          // Extract the month number from the current date (months are zero-based, so January is 0)
          let currentMonthNumber = currentDate.getMonth() ; // Adding 1 to adjust for zero-based indexing
    
          // make the current month in the date var
          this.date = monthNames[currentMonthNumber] + ' 2024'


      this.distanceChartComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);
      // setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);
      // }, 100);  
      
      // setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);
      // }, 150);

      this.fuelChartComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);

      this.alertChartComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);

    }}


    public journeys:any = []
    public journeyNumbers = 0

  // create a fucntion to get the last 10 journeys
  getJourneys() {
    this.carService.getJourneys(this.page,this.thing_id,this.group_id,this.type_id).subscribe((data: any) => {


      this.journeys = data;
      
    } );
  }

  getJourneyNumbers() {
    this.carService.getJourneyNumbers().subscribe((data: any) => {

      this.journeyNumbers = data[0].journey_count;
    this.f = Math.ceil(this.journeyNumbers/5);

      
    } );
  }

  public f = 100;

  next() {
    this.page += 1;
    this.getJourneys();
    this.startP += 5;
    this.endP += 5;
    
  }

  prev() {
    this.page -= 1;
    this.getJourneys();
    this.startP -= 5;
    this.endP -= 5;
  }


  getTypes() {
    this.carService.getTypes().subscribe((data: any) => {
    
      
    } );

  }

  getGroups() {
    this.carService.getGroups().subscribe((data: any) => {

      this.carGroups = data;
      
    } );

  }


  public selectResult(id:number,name:string) {

    
    this.thing_id = id;
    this.updateDashboard();
    this.getJourneys();
    this.fleet = name;
    this.searchResults = [];
  }


  public search(event:any) {
    
    // chechk if the value length is greate than 2
    if(event.target.value.length > 2)
    {

    this.dashboardService.search(event.target.value).subscribe((data:any) => {
      
      this.searchResults = data;
      
    })
  
  }else {
    this.searchResults = [];
  }
}


// get number of vehicles
public getNumberOfVehicles() {
  this.carService.getNumberOfVehicles().subscribe((data: any) => {

    this.numberofthings = data[0].thing_count;
    
  } );
}

// get active vehicles
public getActiveVehicles() {
  this.carService.getActiveVehicles().subscribe((data: any) => {
    this.numberofactivethings = data[0].active_count;
    
  } );

}

// get number of cars who needs mainctace
public getMaintenance() {
  this.carService.getMaintenance().subscribe((data: any) => {

    
  } );


}


// get fuel concemtion
public getFuelConsumption() {
  this.carService.getFuelConsumption(this.thing_id).subscribe((data: any) => {

    
  } );

}

}
