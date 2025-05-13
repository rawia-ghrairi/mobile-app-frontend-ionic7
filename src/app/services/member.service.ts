import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { members } from 'src/app/data/members.mock';
import { environment } from 'src/environments/environment';
import {  HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

   API_URL = environment.API_URL;
   constructor(private http:HttpClient,private router: Router) {}

  getMembers() {
    return members;
  }
  getDoctorsByPatient() {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      this.redirectToLogin();
      return throwError(() => new Error('Redirect to login'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<{ doctors: any[] }>(`${this.API_URL}patient-doctors`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.redirectToLogin();
        }
        return throwError(() => error);
      })
    );
  }

  private redirectToLogin() {
    localStorage.setItem('redirect_url', this.router.url);
    this.router.navigate(['/auth']);
  }
   
 
}
