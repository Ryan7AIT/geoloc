import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private http: HttpClient) { }

  getThing(thing_id: any) {
    const apiUrl = `http://localhost:8000/realtime/${thing_id}`;

    return this.http.get(apiUrl);
  }

  getRealtimeinfo(car: any) {
    const apiUrl = `http://localhost:8000/realtime/${car}`;

    return this.http.get(apiUrl);
  }

  getJourney(car: any) {
    const apiUrl = `http://localhost:8000/journey/?thing=${car}`;

    return this.http.get(apiUrl);
  }

  getJourneys(page: any,thing_id: number,group_id?:any,type_id?:any) {
    let apiUrl: string;

    if (thing_id == 0) {
      apiUrl = `http://localhost:8000/qa/?page=${page}`;
    }else {
      apiUrl = `http://localhost:8000/qa/?thing_id=${thing_id}&page=${page}`;
    }

    return this.http.get(apiUrl);
  }

  getTypes() {
    const apiUrl = `http://localhost:8000/get_thing_types`;

    return this.http.get(apiUrl);
  }

  getGroups() {
    const apiUrl = `http://localhost:8000/get_thing_groups`;

    return this.http.get(apiUrl);
  }

  getJourneyNumbers() {
    const apiUrl = `http://localhost:8000/journycount`;

    return this.http.get(apiUrl);
  }


  getNumberOfVehicles() {
    const apiUrl = `http://localhost:8000/thingcount`;

    return this.http.get(apiUrl);
  }

  getActiveVehicles() {
    const apiUrl = `http://localhost:8000/activecount`;

    return this.http.get(apiUrl);
  }

  getMaintenance() {
    const apiUrl = `http://localhost:8000/maintenance`;

    return this.http.get(apiUrl);
  }

  getFuelConsumption(thing_id: any) {
    const apiUrl = `http://localhost:8000/fuelconsumption`;

    return this.http.get(apiUrl);
  }


  // get list of cars
  getCars(thing_id: any) {
    const apiUrl = `http://localhost:8000/realtime/${thing_id}`;

    return this.http.get(apiUrl);
  }

  getMapInfo() {
    const apiUrl = `http://localhost:8000/get_cars`;

    return this.http.get(apiUrl);
  }

}

