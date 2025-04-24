import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, arrowForwardOutline, calendarOutline, locationOutline, menu, options, personCircle } from 'ionicons/icons';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, FullCalendarModule,]
})
export class CalendarPage implements OnInit {
  isModalOpen = false;
  showStart=false;
  showEnd=false;
  selectedDate: string | null = null;
  selectedDateEvents: any[] = [];
  segmentValue = '1';
  monthCalendarOptions: CalendarOptions;
  AddEvent:EventSourceInput=[];
  newEvent:any={
  title:'',
  allDay:false,
  startTime:'',
  endTime:''
  }
 
 
 
setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

startChange(event:CustomEvent){
  this.newEvent.startTime = event.detail.value;

}
endChange(event:CustomEvent){
  this.newEvent.endTime = event.detail.value;
}
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
  contentHeight: 'auto',  // Utiliser la hauteur dynamique
  aspectRatio: 1.8,       // Ajuster l'aspect ratio pour que le calendrier s'étende
  height: '100%', 
  slotMinTime: '08:00:00',  // Commence la journée à 8 AM (08h00) 
  slotMaxTime: '20:00:00',  // Termine la journée à 8 PM (20h00)
  slotDuration: '00:30:00', 
};

  constructor(private eventService: CalendarService) {
        addIcons({personCircle,options,locationOutline,calendarOutline,arrowForwardOutline,menu,add,});
        this.monthCalendarOptions = {
          ...this.calendarOptions,
          dateClick: (arg) => this.handleMonthDateClick(arg)
        };
   }
   handleMonthDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.filterEventsForSelectedDate();
  }

  filterEventsForSelectedDate() {
    if (!this.selectedDate) {
      this.selectedDateEvents = [];
      return;
    }

    const selectedDay = new Date(this.selectedDate);
    const nextDay = new Date(selectedDay);
    nextDay.setDate(selectedDay.getDate() + 1);

    this.selectedDateEvents = (this.calendarOptions.events as any[]).filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = event.end ? new Date(event.end) : eventStart;
      
      return (eventStart >= selectedDay && eventStart < nextDay) || 
             (eventEnd > selectedDay && eventEnd <= nextDay) ||
             (eventStart <= selectedDay && eventEnd >= nextDay);
    });}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      // Assignez les mêmes événements aux deux calendriers
      this.calendarOptions.events = events;
    });
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
  
  addEvent() {
    if (!this.newEvent.title || !this.newEvent.startTime) return;
    
    const eventData = {
      title: this.newEvent.title,
      start: this.newEvent.startTime,
      end: this.newEvent.endTime,
      allDay: this.newEvent.allDay
    };
    this.eventService.addEvent(eventData).subscribe({
      next: (response) => {
        // Ajoutez uniquement au tableau principal
        this.calendarOptions.events = [
          ...this.calendarOptions.events as any[],
          response.event
        ];
        
        this.newEvent = {
          title: '',
          allDay: false,
          startTime: '',
          endTime: ''
        };
        this.setOpen(false);
        this.filterEventsForSelectedDate();
      },
      error: (err) => {
        console.error('Error adding event:', err);
      }
    });
  }


    
        
       
}
