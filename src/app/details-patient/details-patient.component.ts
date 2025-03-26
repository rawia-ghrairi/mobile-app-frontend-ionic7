import { Component,Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { DateComponent } from '../date/date.component';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonPopover
} from '@ionic/angular/standalone';
import { calendarOutline, list, timeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  standalone: true,
  styleUrls: ['./details-patient.component.scss'],
  imports:[IonButton, IonButtons,IonIcon,IonList, IonContent, IonHeader,IonThumbnail, IonModal, IonTitle, IonToolbar,IonItem,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    DateComponent,
    CommonModule,
    IonPopover
  ],
})
export class DetailsPatientComponent  implements OnInit {
  @Input() patient: any; // Recevoir le patient sélectionné
  isModalOpen = false;

  isCalendarOpen = false;

  openCalendar() {
    this.isCalendarOpen = true;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit(): void {
  }
constructor(){
  addIcons({timeOutline,calendarOutline});
     }

}
