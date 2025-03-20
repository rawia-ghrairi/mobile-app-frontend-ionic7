import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonNote, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { Router } from '@angular/router';
import { add, menu, options, personCircle } from 'ionicons/icons';
import { patients } from '../data/patients';
import { Patient } from '../interfaces/patient.interface';

@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.page.html',
  styleUrls: ['./doctor-home-page.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonCard, IonItemGroup, IonNote, IonFabButton, IonFab,
     IonButtons, IonButton, IonIcon, IonGrid, IonList, IonRow, IonItem, IonText, 
     IonCol, IonLabel, IonSegment, IonSegmentButton, IonContent, IonHeader, IonTitle,
      IonToolbar, CommonModule, FormsModule,]
})
export class DoctorHomePagePage implements OnInit {
 
  segmentValue = '1';
  patientList: Patient[] = [];
  appointmentRequests: Patient[] = [];


  constructor(private router: Router) {
    addIcons({menu,personCircle,options,add,});
   }

   ngOnInit() {
    this.appointmentRequests=[...patients];
    this.patientList= [...patients];
  }
  segmentChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
  ShowDetails(){
    this.router.navigate(["/patientProfile"]);
  }
}
