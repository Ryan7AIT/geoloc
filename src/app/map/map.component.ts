import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit, AfterViewInit{

  private map!: L.Map
  markers: L.Marker[] = [];


  @Output() newItemEvent:any = new EventEmitter<string>();


  positions: L.LatLng[] = [];
  nmarker: L.Marker = L.marker([36.4233, 3.1105]);
        // Create a custom car icon
         carIcon = L.icon({
          iconUrl: './../../assets/gps-navigation.png', // URL to your car icon image
          iconSize: [38, 38], // size of the icon
          iconAnchor: [19, 19], // point of the icon which will correspond to marker's location
        });



  ngAfterViewInit(): void {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }
  ngOnInit(): void {
    this.updateCarPosition();

  }

  private initializeMap() {



    this.map = L.map('map').setView([36.718939, 3.181767], 5);

    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map

    const markerOptions = {
      id: 1,
      title: 'Marker 1',
      icon: this.carIcon // Assuming carIcon is already defined
    };

    this.nmarker = L.marker(L.latLng([36.718939, 3.181767]), markerOptions).addTo(this.map).on('click', this.onMarker.bind(this));
    this.markers.forEach(marker => {
      
      marker.addTo(this.map).on('click', (e) => {
        // console.log(111);
        
      });

   

    } )
  }

  private   onMarker(event: any) {
  // Retrieve the marker from the event


  this.newItemEvent.emit('d');

  const marker = event.target;

  // Retrieve the marker ID from its options
  const markerId = marker.options.id;

  // Now you have access to the marker ID, you can use it as needed
  console.log('Marker ID:', markerId);    


    
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }


  private updateCarPosition(): void {


    const path : any= [
      [36.718939, 3.181767], 
      [36.718892,3.181906],
      [36.718857,3.182003], 
      [36.718810,3.182116], 
      [36.718746,3.182207], 
      [36.718690,3.182325], 
      [36.718608,3.182395], 
      [36.718531,3.182502], 
      [36.718466,3.182620], 
      [36.718316,3.182853], 
      [36.718221,3.183068], 
      [36.718109,3.183250], 
      [36.717937,3.183508], 
      [36.717774,3.183787],
      [36.717696,3.183894], 
      [36.717533,3.184216], 
      [36.717327,3.184614], 
      [36.717167,3.184844], 
      [36.716857,3.185370], 
      
      // Add more waypoints as needed
    ];

    let index = 0; // Index to track the current position in the path

    
    // setInterval(() => {
    //   // Generate a random position (for demonstration purposes)
    //   const newPosition = L.latLng(path[index]);



    //   // Store the new position
    //   this.positions.push(newPosition);


    //   // Remove the previous marker from the map
    //   if (this.nmarker) {
    //     this.map.removeLayer(this.nmarker);
    //   }



    //   // Add a marker with the custom car icon at the new position
    //   this.nmarker = L.marker(newPosition, { icon: this.carIcon }).addTo(this.map);

    //   this.map.panTo(newPosition);

    //   index = (index + 1) % path.length;


    // }, 1000);
  }

  private generateRandomPosition(): L.LatLng {
    // Generate random latitude and longitude within a range
    const minLat = 36.4;
    const maxLat = 36.6;
    const minLng = 2.6;
    const maxLng = 3.5;
    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    return L.latLng(lat, lng);
  }

}
