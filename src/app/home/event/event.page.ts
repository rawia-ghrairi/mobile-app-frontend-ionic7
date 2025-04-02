import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime } from '@ionic/angular/standalone';
import {DailyScheduleComponent} from "../../daily-schedule/daily-schedule.component";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonIcon, IonCard, IonListHeader, IonList, IonAvatar, IonText, IonFooter, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { events } from 'src/app/data/events';
import { Event } from 'src/app/interfaces/event.interface';
import { DateComponent } from "../../date/date.component";
import { FormBookAppointmentComponent } from 'src/app/form-book-appointment/form-book-appointment.component';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonicModule,
    FormBookAppointmentComponent,
    DateComponent,
    DailyScheduleComponent],
})
export class EventPage implements OnInit {
  event!: Event;

  private route = inject(ActivatedRoute);

  constructor() {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.getEvent(id);
    }
  }

  getEvent(id: string) {
    this.event = events.find((event) => event.id == id)!;
  }
}
