import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }


  // getOilData from api url
  getOilData(thing_id?: any) {
    const url = `http://localhost:8000/historical/oil?thing_id=${thing_id}`

    return this.http.get(url);
  }

    // getOilData from api url
    getFuelData(thing_id: any) {
      const url = `http://localhost:8000/historical/fuel?thing_id=${thing_id}`
  
      return this.http.get(url);
    }

    // get battery from api url
    getBatteryData(thing_id: any) {
      const url = `http://localhost:8000/historical/battery?thing_id=${thing_id}`
  
      return this.http.get(url);
    }


    // get prediction
    getPrediction() {
      const url = 'http://localhost:8000/get_car2'
  
      return this.http.get(url);
    }

    // add car to maintenance

    addCarToMaintenance(car: any) {
      const url = `http://localhost:8000/add_car_to_maintenance?thing_id=${car}`
      car = {
        thing_id: car
      }
      return this.http.post(url, car);
    }


    // 
}
