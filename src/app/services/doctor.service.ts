import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:5000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctors`);
  }
  

  // This is the method that simulates fetching a single doctor by id.
  getDoctorById(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/doctors`).pipe(
      map((doctors) => doctors.find((doc) => doc._id === id)) // Find the doctor by ID
    );
  }
}
