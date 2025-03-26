import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonNote, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { Router } from '@angular/router';
import { add, arrowForwardOutline, locationOutline, menu, options, personCircle } from 'ionicons/icons';
import { patients } from '../data/patients';
import { Patient } from '../interfaces/patient.interface';
import { DetailsPatientComponent } from '../details-patient/details-patient.component';

@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.page.html',
  styleUrls: ['./doctor-home-page.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonCard, IonItemGroup, IonNote, IonFabButton, IonFab,
     IonButtons, IonButton, IonIcon, IonGrid, IonList, IonRow, IonItem, IonText, 
     IonCol, IonLabel, IonSegment, IonSegmentButton, IonContent, IonHeader, IonTitle,
      IonToolbar, CommonModule, FormsModule,DetailsPatientComponent]
})
export class DoctorHomePagePage implements OnInit {
 
  segmentValue = '1';
  patientList: Patient[] = [];
  appointmentRequests: Patient[] = [];
  filteredappointmentRequests: Patient[] =[] ;

  constructor(private router: Router) {
    addIcons({personCircle,options,locationOutline,arrowForwardOutline,menu,add,});
   }

   ngOnInit() {
    this.appointmentRequests=[...patients];
    this.patientList= [...patients];
    this.filteredappointmentRequests=[...patients];
  }
  segmentChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
  ShowDetails(){
    this.router.navigate(["/patientProfile"]);
  }

  declineRequest(id:any){
this.filteredappointmentRequests=this.appointmentRequests.filter((item:any)=>item.id!=id);
  }
}
