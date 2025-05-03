import { Component,Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { DateComponent } from '../date/date.component';
import { IonicModule } from '@ionic/angular';
import { calendarOutline, checkmarkDoneOutline, checkmarkOutline,timeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { EventSourceInput } from '@fullcalendar/core';
import { CalendarService } from '../services/calendar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  standalone: true,
  styleUrls: ['./details-patient.component.scss'],
  imports:[
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class DetailsPatientComponent  implements OnInit {
  @Input() patient: any; // Receive the selected patient
  flaskApiUrl = 'http://127.0.0.1:5000/uploads';  
  isModalOpen = false;
  isModalOpenConfirm =false;
  isModalOpenReschedule = false;
  isCalendarOpen = false;
  images: string[] = [];
  showStart=false;
  showEnd=false;
  newEvent:any={
    title:'',
    allDay:false,
    startTime:'',
    endTime:''
    }
    setOpenConfim(isOpen: boolean){
      this.isModalOpenConfirm = isOpen;
      this.newEvent.startTime=this.patient?.date_rdv;
    }
  
  setOpenReschedule(isOpen: boolean) {
    this.isModalOpenReschedule = isOpen;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen= isOpen;
  }

startChange(event:CustomEvent){
  this.newEvent.startTime = event.detail.value;

}
endChange(event:CustomEvent){
  this.newEvent.endTime = event.detail.value;
}
  
  openCalendar() {
    this.isCalendarOpen = true;
  }

  ngOnInit(): void {
    this.newEvent.title = this.patient?.name 
    this.fetchImages();
  }

constructor(private http: HttpClient,private eventService:CalendarService,private popoverController: PopoverController,private fb: FormBuilder,private patientService: PatientService){
  addIcons({timeOutline,calendarOutline,checkmarkDoneOutline});
     }

rescheduleAppointment(emailPatient:string){
    const dateValue = this.newEvent.startTime;
     const formattedDate = dateValue ? new Date(dateValue).toISOString().slice(0, 19).replace("T", " ") : null;
    const patientData = {
      email: emailPatient,
      date_rdv: formattedDate,
    };
    console.log('patient is:', patientData);
    this.patientService.reschedule_appointment_by_email(emailPatient,patientData).subscribe(
      (data: any) => {
        this.patient.date_rdv=formattedDate;
        console.log('Appointment updated successfully:', data);
      },
      (error: any) => {
        console.error(' error:', error);

      }
    );
    this.newEvent.title=this.patient?.name;
    const eventData = {
      title: this.newEvent.title,
      start: this.newEvent.startTime,
      end: this.newEvent.endTime,
      allDay: this.newEvent.allDay
    };
    console.log('event Data is:', eventData);
    this.eventService.addEvent(eventData).subscribe({
      next: (response) => {
        this.newEvent = {
          title: '',
          allDay: false,
          startTime: '',
          endTime: ''
        };
        console.log('event Added in calendar successfully ', response);
        this.setOpenReschedule(false);  
      },
      error: (err) => {
        console.error('Error adding event:', err);
      }
    });
  
}
fetchImages() {
  this.http.get<{ images: string[] }>(`${this.flaskApiUrl}/list`).subscribe(
    (data) => {
      console.log("Raw API Response:", data); // Log full response

      // Extract the images array from the response object
      this.images = data.images || [];

      // Prepend the Flask API URL to each image filename
      this.images = this.images.map((image) => `${this.flaskApiUrl}/${image}`);

      console.log("Images with full URL:", this.images); // Log the updated image URLs
    },
    (error) => {
      console.error('Error fetching images:', error);
    }
  );
}



confirmAppointment(){
  this.newEvent.startTime=this.patient?.date_rdv
  const eventData = {
    title: this.newEvent.title,
    start: this.newEvent.startTime,
    end: this.newEvent.endTime,
    allDay: this.newEvent.allDay
  };
  console.log('event Data is:', eventData);
  this.eventService.addEvent(eventData).subscribe({
    next: (response) => {
      this.newEvent = {
        title: '',
        allDay: false,
        startTime: '',
        endTime: ''
      };
      console.log('event Added in calendar successfully ', response);
      this.setOpenConfim(false);  
    },
    error: (err) => {
      console.error('Error adding event:', err);
    }
  });
}
}