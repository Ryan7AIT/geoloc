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

  
}

