import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements AfterViewInit {

  private map2!: L.Map;
  points: L.LatLngExpression[] = [
    [36.7538, 3.0588],
    [36.7525, 3.0420],
    [36.7539, 3.0360],
    [36.7539, 3.0360],
    [36.7539, 3.0360],
    [36.7539, 3.0360],
    [36.7539, 3.0360],
    [36.7539, 3.0360]
  ];

  ngAfterViewInit(): void {
    this.initializeMap();
    this.displayRoute(this.points);
    this.addMarkers(this.points);
    this.addDefaultMarker([36.7540, 3.0360]);
  }

  private initializeMap() {
    this.map2 = L.map('map2').setView([36.718939, 3.181767], 6);
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(baseMapURl).addTo(this.map2);
  }

  public displayRoute(points: L.LatLngExpression[]) {
    const route = L.polyline(points, { color: 'red' }).addTo(this.map2);
    this.map2.fitBounds(route.getBounds());
  }

  private addMarkers(points: L.LatLngExpression[]) {
    points.forEach(point => {
      L.marker(point).addTo(this.map2);
    });
  }

  private addDefaultMarker(point: L.LatLngExpression) {
    L.marker(point).addTo(this.map2);
  }
}