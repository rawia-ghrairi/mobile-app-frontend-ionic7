import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private storage: Storage) {}

  async getPatientDoctors() {
    // Get the token from storage
    const token = await this.storage.get('token');
    
    // Set headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/patient-doctors`, { headers });
  }
}