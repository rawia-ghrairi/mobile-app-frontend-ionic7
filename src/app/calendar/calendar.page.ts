import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import { IonContent, IonHeader, IonLabel, IonList, IonNote, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonText, IonNote, IonList, IonSegment, IonSegmentButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FullCalendarModule]
})
export class CalendarPage implements OnInit {
segmentValue = '1';
AddEvent:EventSourceInput=[];

//calendarOptions:objet de type CalendarOptions qui configure FullCalendar 
calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth', //initialView:'dayGridMonth':Quand le calendrier se charge, il affiche par défaut le mois entier
  plugins: //plugins:Liste des plugins FullCalendar utilisés
  [dayGridPlugin,//vue mois
     interactionPlugin,//interacrion avec le calendar
      timeGridPlugin], // "semaine" et "jour" avec des créneaux horaires.
      headerToolbar: {
        left: 'prev', 
        center: 'title', 
        right: 'next', 
      },
  dateClick: (arg) => {
    this.handleDateClick(arg);
  },
  events: [
    { title: 'event 1', start: '2025-02-01' },
    { title: 'event 2', start: '2025-02-02' }
  ],
  contentHeight: 'auto',  // Utiliser la hauteur dynamique
  aspectRatio: 1.8,       // Ajuster l'aspect ratio pour que le calendrier s'étende
  height: '100%', 
  slotMinTime: '08:00:00',  // Commence la journée à 8 AM (08h00) 
  slotMaxTime: '20:00:00',  // Termine la journée à 8 PM (20h00)
  slotDuration: '00:30:00', 
};

  handleDateClick(arg:any) {
      alert('date click! ' + arg.dateStr)

  }

  constructor() { }

  ngOnInit() {
  }
  timeChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
    if (this.segmentValue === '1') {
      this.calendarOptions.initialView = 'dayGridMonth'; // Vue Mois
    } else if (this.segmentValue === '2') {
      this.calendarOptions.initialView = 'timeGridWeek'; // Vue Semaine
    } else if (this.segmentValue === '3') {
      this.calendarOptions.initialView = 'timeGridDay'; // Vue Jour
    }
  }
}
