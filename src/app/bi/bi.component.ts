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
import { DashboardService } from '../dashboard.service';
import { FormsModule } from '@angular/forms';


import * as L from 'leaflet';
import 'leaflet.fullscreen';


@Component({
  selector: 'app-bi',
  standalone: true,
  imports: [BiMapComponent,FormsModule,DistanceChartComponent,MapComponent,SidebarComponent,ContainerComponent,NgIf,AvgMaxSpeedChartComponent,CommonModule,CarUtilizationComponent,FuelChartComponent,AlertChartComponent,RoundNumPipe],

  templateUrl: './bi.component.html',
  styleUrl: './bi.component.css'
})
export class BiComponent implements OnInit {
  @ViewChild(DistanceChartComponent) distanceChartComponent!: DistanceChartComponent;
  @ViewChild(CarUtilizationComponent) carUtilizationComponent!: CarUtilizationComponent;
  @ViewChild(AvgMaxSpeedChartComponent) avgMaxSpeedChartComponent!: AvgMaxSpeedChartComponent;

  public type = 'type0';
  public group = 'group0';

  public map!: L.Map ;
  public car = []
  public selectedCarId = 0;
  public selectedCar = {};
  public carTypes = [];
  public carGroups: any = [];

  public showSidebar = false;

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

  public currentDate = new Date();
    
  // Extract the month number from the current date (months are zero-based, so January is 0)
  public currentMonthNumber = this.currentDate.getMonth() ; // Adding 1 to adjust for zero-based indexing


  public month =  this.currentMonthNumber;

  


  ngOnInit() {
    this.initializeMap();
    this.getJourneys();

    setTimeout(() => { this.getTypes()}, 200);
    setTimeout(() => { this.getGroups()}, 400);


  
  }

  constructor(private carService: CarServiceService,private dashboardService: DashboardService) { }

  initializeMap() {
    this.map = L.map('map', {
      fullscreenControl: true,  // Add this option to enable the fullscreen control
    } as L.MapOptions).setView([28.0339, 1.6596], 5); // Set the initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18  // Increase maxZoom to allow deeper zooming
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
      var carPositions = [
        { lat: 28.0339, lng: 1.6596 },
        { lat: 29.0339, lng: 2.6596 },
        // Add more positions here
    ];



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
        for (let position of carPositions) {
          L.marker([position.lat, position.lng],markerOptions).addTo(this.map)        .on('click', this.onMarker.bind(this));

      }

      


      
}

private onMarker(event: any) {
  const marker = event.target;
  console.log('from onMarker');
  this.showSidebar = !this.showSidebar ;
  
  // const markerId = this.markers.indexOf(marker);


  
  // this.newItemEvent.emit(`Marker ID: ${this.cars[markerId][1]}`);
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


  updateDash(event?: any) {
    console.log(event.target.value);

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
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);
      }, 100);

      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('yearly',this.thing_id,this.group_id,this.type_id);
      }, 150);


      this.date = '';


    }


    if(this.time == 'monthly') {

      this.date = this.year.toString();



      this.distanceChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      }, 100);     
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('monthly',this.thing_id,this.year,this.group_id,this.type_id);
      }, 150);

      
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
      setTimeout(() => {  
        this.carUtilizationComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);
      }, 100);  
      
      setTimeout(() => {  
        this.avgMaxSpeedChartComponent.updateDashboard('daily',this.thing_id,this.group_id,this.type_id,this.year,this.month);
      }, 150);

    }}


    public journeys:any = []

  // create a fucntion to get the last 10 journeys
  getJourneys() {
    this.carService.getJourneys(this.selectedCarId).subscribe((data: any) => {


      this.journeys = data;
      
    } );
  }

  getTypes() {
    this.carService.getTypes().subscribe((data: any) => {
      console.log('from getTypes');
      console.log(data);
      
    } );

  }

  getGroups() {
    this.carService.getGroups().subscribe((data: any) => {
      console.log('from getGroups');
      console.log(data);
      this.carGroups = data;
      
    } );

  }


  public selectResult(id:number,name:string) {
    console.log('from selectResult');
    
    // this.search = event;
    console.log(id);
    
    this.thing_id = id;
    this.updateDashboard();
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

}
