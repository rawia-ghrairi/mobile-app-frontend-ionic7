import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  API_URL = environment.API_URL;
  constructor(private http:HttpClient) {}

// Récupérer les demandes de rendez-vous pour un médecin spécifique
getDoctorAppointmentsByDoctorId(doctorId: string) {
  return this.http.get(`${this.API_URL}appointments/doctor/${doctorId}`);
}
  patientRegister(req: any){
    return this.http.post(`${this.API_URL}book-appointment`,req);
  }

  getAppointmentsRequest() {
    return this.http.get(`${this.API_URL}appointments`);
  }
  
  getAcceptedAppointment(){
    return this.http.get(`${this.API_URL}appointments/accepted`)
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
