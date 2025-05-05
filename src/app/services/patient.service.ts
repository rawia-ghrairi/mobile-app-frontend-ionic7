import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {  HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  API_URL = environment.API_URL;
  constructor(private http:HttpClient,private router: Router) {}

  patientRegister(req: any){
    return this.http.post(`${this.API_URL}book-appointment`,req);
  }




  getAppointmentsRequest() {
    const token = localStorage.getItem('auth_token');
        if (!token) {
          this.redirectToLogin();
          return throwError(() => new Error('Redirection vers la page de login'));
        }
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.get(`${this.API_URL}appointments`, { headers }).pipe(
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

  getAcceptedAppointment(){
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.redirectToLogin();
      return throwError(() => new Error('Redirect to login page'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.API_URL}appointments/accepted`, { headers }).pipe(
          catchError((error) => {
            if (error.status === 401) {
              this.redirectToLogin();
            }
            return throwError(() => error);
          })
        );
  }
  accept_appointment_by_email(appointmentEmail: string) {
    return this.http.put(`${this.API_URL}accept-appointment-by-email/${appointmentEmail}`, {});
  }
  
  delete_appointment_by_email(email:string){
    return this.http.delete(`${this.API_URL}delete-appointment-by-email/${email}`,{});
  }
  reschedule_appointment_by_email(email: string, patientData: any) {
    return this.http.put(`${this.API_URL}reschedule-appointment-by-email`,patientData);
  }
  
}
