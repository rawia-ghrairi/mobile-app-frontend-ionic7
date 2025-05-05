import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get(`${this.API_URL}profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
  }

  updateProfile(profileData: any) {
    return this.http.put(`${this.API_URL}profile`, profileData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
  }
}