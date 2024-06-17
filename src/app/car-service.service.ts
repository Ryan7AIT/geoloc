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

    if (group_id) {
      apiUrl = `http://localhost:8000/qa/?group_id=${group_id}&page=${page}`;
    }else if(type_id){
      apiUrl = `http://localhost:8000/qa/?type_id=${type_id}&page=${page}`;
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

  getJourneyNumbers(thing_id: any,group_id?:any,type_id?:any) {

    let apiUrl: string;

    if (thing_id == 0) {
      apiUrl = `http://localhost:8000/journycount`;
    }
    else {
      apiUrl = `http://localhost:8000/journycount?thing_id=${thing_id}`;
    }

    if (group_id) {
      apiUrl = `http://localhost:8000/journycount?group_id=${group_id}`;
    }else if(type_id){
      apiUrl = `http://localhost:8000/journycount?type_id=${type_id}`;
    }


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

    if(thing_id == 0){
      const apiUrl = `http://localhost:8000/fuelconsumption`;
      
      return this.http.get(apiUrl);
    }else  {
      const apiUrl = `http://localhost:8000/fuelconsumption?thing_id=${thing_id}`;
      return this.http.get(apiUrl);
    }
    const apiUrl = `http://localhost:8000/fuelconsumption?thing_id=${thing_id}`;

    return this.http.get(apiUrl);
  }


  // get list of cars
  getCars(thing_id: any) {
    const apiUrl = `http://localhost:8000/realtime/${thing_id}`;

    return this.http.get(apiUrl);
  }

  getMapInfo(thing_id?: any, type_id?: any,group_id?:any) {

    let apiUrl: string;

    if (thing_id == 0)  {
      apiUrl = `http://localhost:8000/get_cars`;

    }else {
      apiUrl = `http://localhost:8000/get_cars?thing_id=${thing_id}`;
    }

  if (type_id) {
    apiUrl = `http://localhost:8000/get_cars?type_id=${type_id}`;
  }else if(group_id){
    apiUrl = `http://localhost:8000/get_cars?group_id=${group_id}`;
  }


    return this.http.get(apiUrl);
  }

  // get prediction
  getPrediction(thing_id: any) {
    const url = 'http://localhost:8000/get_car2?thing_id=' + thing_id;

    return this.http.get(url);
  }


  getMaintenanceCars() {
    const apiUrl = `http://localhost:8000/maintenanceC`;

    return this.http.get(apiUrl);
  }


  deleteCar(thing_id: any) {
    const apiUrl = `http://localhost:8000/delete_car?thing_id=${thing_id}`;

    return this.http.put(apiUrl, {});
  }



}

