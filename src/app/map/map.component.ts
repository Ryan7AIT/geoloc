import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})




export class MapComponent implements OnInit {
  private map!: L.Map;
  markers: L.Marker[] = [];
  carIcons: L.Icon[] = []; // Array to store car icons
  public cars: any[] = [];

  @Output() newItemEvent: any = new EventEmitter<string>();

  
  positions: L.LatLng[][] = [
    [
      L.latLng(36.718939, 3.181767),
      L.latLng(36.718949, 3.181777),
      L.latLng(36.718959, 3.181787)
    ]
  ];

  ngOnInit(): void {
    this.initializeMap();
    this.addMarkers();
    // this.centerMap();
    this.updateCarPositions();

    this.cars = [['car1',629]]
  }

  private initializeMap() {
    this.map = L.map('map').setView([36.718939, 3.181767], 6);
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {



    let carIcon = L.icon({
      iconUrl: './../../assets/gps-navigation.png', // URL to your car icon image
      iconSize: [38, 38], // size of the icon
      iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
    });
    const markerOptions = {
      title: 'Marker',
      icon: carIcon ,
      draggable: true,
      

    };

 

      const marker = L.marker(this.generateRandomPosition(), markerOptions)
        .addTo(this.map)
        .on('click', this.onMarker.bind(this));
      this.markers.push(marker);
    // }
  }

  private onMarker(event: any) {
    const marker = event.target;
    const markerId = this.markers.indexOf(marker);


    
    this.newItemEvent.emit(`Marker ID: ${this.cars[markerId][1]}`);
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

  private updateCarPositions(): void {
    setInterval(() => {
      this.positions.forEach((path, index) => {
        const newPosition = L.latLng(path[0]);
        path.shift(); // Remove the first position from the path

        if (path.length === 0) {
          // Generate a new random path when the current path is empty
          path.push(...this.generateRandomPath());
        }

        this.markers[index].setLatLng(newPosition);
      });
    }, 2000);
  }

  private generateRandomPosition(): L.LatLng {
    const minLat = 36.4;
    const maxLat = 36.6;
    const minLng = 2.6;
    const maxLng = 3.5;
    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    return L.latLng(lat, lng);
  }

  private generateRandomPath(): L.LatLng[] {
    const path: L.LatLng[] = [];
    const numWaypoints = Math.floor(Math.random() * 10) + 5; // Random number of waypoints between 5 and 14

    for (let i = 0; i < numWaypoints; i++) {
      path.push(this.generateRandomPosition());
    }

    return path;
  }



  

}

