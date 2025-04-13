import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonFabButton,
  IonBadge,
  IonRow,
  IonCol,
  IonSearchbar,
  IonicSlides,
  IonList,
  IonCard,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  locateOutline,
  locationOutline,
  notificationsOutline,
  optionsOutline, heartOutline, menuOutline } from 'ionicons/icons';
import { Category } from '../interfaces/category.interface';
import { Event } from '../interfaces/event.interface';
import { events } from '../data/events';
import { services } from '../data/services';
import { categories } from '../data/categories';
import { RouterLink } from '@angular/router';
import { Doctor } from '../interfaces/doctor.interface';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonList,
    IonSearchbar,
    IonCol,
    IonRow,
    IonBadge,
    IonFabButton,
    IonText,
    IonIcon,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonContent,
    RouterLink,
    CommonModule
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  upcomingEvents: Event[] = [];
  currentEvents: Event[] = [];
  categories: Category[] = [];
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {
    addIcons({menuOutline,locateOutline,notificationsOutline,optionsOutline,locationOutline,arrowForwardOutline,heartOutline});
  }

  

  ngOnInit(): void {
    this.currentEvents = [...services];
    console.log('current', this.currentEvents);
    this.upcomingEvents = events.sort((a, b) => {
      // Convert id to number for comparison
      const idA = parseInt(a.id, 10);
      const idB = parseInt(b.id, 10);
      return idB - idA; // Descending order
    });
    console.log(this.upcomingEvents);
    this.categories = [...categories];
    console.log(this.categories);

    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      console.log('Doctors isra:', this.doctors); // This will log the doctor data
    });

    
  }

 trackDoctor(index: number, doctor: Doctor): string {
  return doctor && doctor._id ? doctor._id : index.toString();// assuming 'id' is unique for each doctor
  }

}
