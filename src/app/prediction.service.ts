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
}
