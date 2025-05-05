import { Component,Input, OnInit, Inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { DateComponent } from '../date/date.component';
import { IonicModule } from '@ionic/angular';
import { calendarOutline, checkmarkDoneOutline, checkmarkOutline, timeOutline, document as documentIcon } from 'ionicons/icons';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { EventSourceInput } from '@fullcalendar/core';
import { CalendarService } from '../services/calendar.service';
import { HttpClient } from '@angular/common/http';
import { FilesService } from '../services/files.services';

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
    files:any;
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

constructor(
  private filesService: FilesService,
  private http: HttpClient,
  private eventService:CalendarService,
  private popoverController: PopoverController,
  private fb: FormBuilder,
  private patientService: PatientService,
  @Inject(DOCUMENT) private document: Document
){
  addIcons({timeOutline,calendarOutline,checkmarkDoneOutline,document: documentIcon});
}

isPdfFile(file: any): boolean {
  return file.file_type === 'pdf' || file.DiagnosticFile?.toLowerCase().endsWith('.pdf');
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
  this.filesService.getFileByDoctor().subscribe(
    (data) => {
      if (data) {
        this.files = data;  // Set doctor if found
        console.log(this.files);
        console.log('Doctor data:',this.files);  // Log for debugging
      } else {
        console.error('File not found :');  // Handle case where doctor is not found
      }
    },
    (error) => {
      console.error('Error fetching file data:', error);
    }
  );
}
startUpload(file: any) {
  const link = this.document.createElement('a');
  link.href = file.DiagnosticFile;
  link.download = file.filname || 'diagnostic_file';
  link.target = '_blank';
  this.document.body.appendChild(link);
  link.click();
  this.document.body.removeChild(link);
  
  // Mark file as consulted when doctor downloads it
  const fileId = file.id || file._id;
  this.filesService.markFileAsConsulted(fileId).subscribe(
    (res: any) => {
      console.log('File marked as consulted:', res);
      // Update local file status to reflect consultation
      if (file && !file.isConsulted) {
        file.isConsulted = true;
      }
    },
    (err) => {
      console.error('Error marking file as consulted:', err);
    }
  );
}

deleteImage(file: any) {
  // Use file.id instead of file._id to match backend response
  const fileId = file.id || file._id;
 
  this.filesService.deleteFileById(fileId).subscribe(
    (res: any) => {
      console.log('File deleted:', res);
      this.fetchImages(); // Recharge la liste des fichiers
    },
    (err) => {
      console.error('Error deleting file:', err);
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