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
}

