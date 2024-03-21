import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // Get the current date
 currentDate = new Date();

// Extract the month number from the current date (months are zero-based, so January is 0)
currentMonthNumber = this.currentDate.getMonth() + 1; // Adding 1 to adjust for zero-based indexing


  getDataFromApi() {
    const apiUrl = 'http://localhost:8000/query/';

    return this.http.get(apiUrl);
  }

  getDistanceTravlled(thing_id: any) {

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/distance`;

    }else 
    {
      
       apiUrl = `http://localhost:8000/query/${thing_id}/distance`;
    }

    return this.http.get(apiUrl);
  }

  getDistanceTravlledYears(thing_id: any) {
    let apiUrl: string;

    if (thing_id == 0) {
      apiUrl = `http://localhost:8000/query/distancea`;
    } else {
      apiUrl = `http://localhost:8000/query/distancea?thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }


  //  http://localhost:8000/query/629/distancea?months=1

  getDistanceTravlledMonth(thing_id: any) {
    let apiUrl: string;

    if (thing_id == 0) {
      apiUrl = `http://localhost:8000/query/distancea?years=2024`;
    } else {
      apiUrl = `http://localhost:8000/query/distancea?years=2024&thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }

  // http://localhost:8000/query/629/distancea?years=1&months=1
  getDistanceTravlledDays(thing_id: any) {

    let apiUrl: string;

    if (thing_id == 0) {
      apiUrl = `http://localhost:8000/query/distancea?years=2024&months=${this.currentMonthNumber}`;
    }else { 
      apiUrl = `http://localhost:8000/query/distancea?years=2024&months=${this.currentMonthNumber}&thing_id=${thing_id}`;
    }


    return this.http.get(apiUrl);
  }

  getSpentTime(thing_id: number) {

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/time`;
    }else{
        apiUrl = `http://localhost:8000/query/time?thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }

  getSpentTimeMonths(thing_id: number) {
    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/time?years=2024`;
    }else{
        apiUrl = `http://localhost:8000/query/time?years=2024&thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }

  getSpentTimeDays(thing_id: number) {
    // const apiUrl = `http://localhost:8000/query/${thing_id}/time?years=2024&months=${this.currentMonthNumber}`;

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/time?years=2024&months=${this.currentMonthNumber}`;
    }
    else {
        apiUrl = `http://localhost:8000/query/time?years=2024&months=${this.currentMonthNumber}&thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }

  getSpeed(thing_id: number) {

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/speed`;
    }
    else {
        apiUrl = `http://localhost:8000/query/speed?thing_id=${thing_id}`;
    }
    return this.http.get(apiUrl);
  }

  getSpeedYears(thing_id: number) {
    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/speed`;
    }
    else {
        apiUrl = `http://localhost:8000/query/speed?thing_id=${thing_id}`;
    }
    return this.http.get(apiUrl);
  }

  getSpeedMonth(thing_id: number) {

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/speed?years=2024`;
    }
    else {
        apiUrl = `http://localhost:8000/query/speed?years=2024&thing_id=${thing_id}`;
    }

    return this.http.get(apiUrl);
  }

  getSpeedDays(thing_id: number) {

    let apiUrl: string;
    if(thing_id == 0) {
       apiUrl = `http://localhost:8000/query/speed?years=2024&months=${this.currentMonthNumber}`;
    }
    else {
        apiUrl = `http://localhost:8000/query/speed?years=2024&months=${this.currentMonthNumber}&thing_id=${thing_id}`;
    }
    return this.http.get(apiUrl);
  }



  getCars() {
    const apiUrl = 'http://localhost:8000/get_things'

    return this.http.get(apiUrl);
  }

  search(thing: string) {
    const apiUrl = 'http://localhost:8000/search/' + thing;

    return this.http.get(apiUrl);
  }

  
}

