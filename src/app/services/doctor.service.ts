import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Doctor } from '../interfaces/doctor.interface';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {

API_URL = environment.API_URL;
constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/doctors`);
  }
  
  addDoctors(req:any) {
    return this.http.post(`${this.API_URL}/doctors`,req);
  }
  // This is the method that simulates fetching a single doctor by id.
  getDoctorById(_id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.API_URL}/doctors/${_id}`)
  }
}
