import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDataFromApi() {
    const apiUrl = 'http://localhost:8000/query/';

    return this.http.get(apiUrl);
  }

  getDistanceTravlled(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/distance`;

    return this.http.get(apiUrl);
  }

  getDistanceTravlledYears(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/distancea`;

    return this.http.get(apiUrl);
  }


  //  http://localhost:8000/query/629/distancea?months=1

  getDistanceTravlledMonth(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/distancea?years=1`;

    return this.http.get(apiUrl);
  }

  // http://localhost:8000/query/629/distancea?years=1&months=1
  getDistanceTravlledDays(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/distancea?years=1&months=1`;

    return this.http.get(apiUrl);
  }

  getSpentTime(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/time`;

    return this.http.get(apiUrl);
  }

  getSpentTimeMonths(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/time?years=1`;

    return this.http.get(apiUrl);
  }

  getSpentTimeDays(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/time?years=1&months=1`;

    return this.http.get(apiUrl);
  }

  getSpeed(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/speed`;

    return this.http.get(apiUrl);
  }

  getSpeedYears(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/speed`;

    return this.http.get(apiUrl);
  }

  getSpeedMonth(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/speed?years=1`;

    return this.http.get(apiUrl);
  }

  getSpeedDays(thing_id: number) {
    const apiUrl = `http://localhost:8000/query/${thing_id}/speed?years=1&months=1`;

    return this.http.get(apiUrl);
  }


  
}

