import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { add, arrowForwardOutline, calendarOutline, locationOutline, menu, options, personCircle } from 'ionicons/icons';
import { patients } from '../data/patients';
import { DetailsPatientComponent } from '../details-patient/details-patient.component';
import { Patient } from '../interfaces/patient.interface';
import { PatientService } from '../services/patient.service';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.page.html',
  styleUrls: ['./doctor-home-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,DetailsPatientComponent]
})
export class DoctorHomePagePage implements OnInit {
  requestNumber:number=0;
  patientNumber=0;
  isAccept=false;
  segmentValue = '1';
  patientList: Patient[] = [];
  appointmentRequests: Patient[] = [];

  constructor(private router: Router,private patientService: PatientService) {
    addIcons({personCircle,options,locationOutline,calendarOutline,arrowForwardOutline,menu,add,});
   }

   ngOnInit() {
    this.loadAppointmentsRequest();
    this.loadPatientList();
  }
  //change between patient list and appointment request 
  segmentChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  //show details of patient
  ShowDetails(){
    this.router.navigate(["/patientProfile"]);
  }


  //refuse appointment
  declineRequest(email:any){
    this.patientService.delete_appointment_by_email(email).subscribe({
    next:()=>{
      this.requestNumber--;
      console.log("appointment has been deleted with success")
      this.loadAppointmentsRequest();
    },
    error: (err) => {
    console.error('Error refusing appointment:', err);
  }
  })
  }
  
// load the page of appointment request
  loadAppointmentsRequest() {
    this.patientService.getAppointmentsRequest().subscribe((data: any) => {
      this.appointmentRequests = data;
      this.requestNumber=this.appointmentRequests.length;
    }, error => {
      console.error("Error loading appointments", error);
    });
  }


  //load the patient list
  loadPatientList(){
   this.patientService.getAcceptedAppointment().subscribe((data:any)=>{
      this.patientList=data;
      this.patientNumber=this.patientList.length;
      console.log(this.patientList);
    },error=>{
        console.error("error Loading patientList",error);
    }
  );
}
  //accept request and add the patient to the patient list
  acceptRequest(appointmentEmail:any) {
    if(appointmentEmail){
      this.patientService.accept_appointment_by_email(appointmentEmail).subscribe({
        next:()=>{
          this.patientNumber++;
          this.requestNumber--;
          console.log("request has been accepted with success")
          this.patientNumber=this.patientList.length;
          this.requestNumber=this.appointmentRequests.length;
          this.loadPatientList();
          this.loadAppointmentsRequest()
        },
      error: (err) => {
        console.error('Error accepting appointment:', err);
      }
    })}else {
      console.error('Invalid appointment ID',appointmentEmail);
    }
  }



}

