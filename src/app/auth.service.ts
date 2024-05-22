// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/login';
  private isLoggedInKey = 'isLoggedIn';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(this.apiUrl, body.toString(), { headers }).pipe(
      tap(() => localStorage.setItem(this.isLoggedInKey, 'true')),
      catchError(error => {
        localStorage.removeItem(this.isLoggedInKey);
        return of(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
