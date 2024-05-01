import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }


  // getOilData from api url
  getOilData() {
    const url = 'http://localhost:8000/historical/oil'

    return this.http.get(url);
  }

    // getOilData from api url
    getFuelData() {
      const url = 'http://localhost:8000/historical/fuel'
  
      return this.http.get(url);
    }

    // get battery from api url
    getBatteryData() {
      const url = 'http://localhost:8000/historical/battery'
  
      return this.http.get(url);
    }


    // get prediction
    getPrediction() {
      const url = 'http://localhost:8000/get_car2'
  
      return this.http.get(url);
    }


    // 
}
