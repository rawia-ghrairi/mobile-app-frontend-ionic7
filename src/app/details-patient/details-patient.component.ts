import { Component,Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { DateComponent } from '../date/date.component';
import { IonicModule } from '@ionic/angular';
import { calendarOutline, timeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  standalone: true,
  styleUrls: ['./details-patient.component.scss'],
  imports:[
    DateComponent,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class DetailsPatientComponent  implements OnInit {
  @Input() patient: any; // Receive the selected patient 
  appointmentReschedule: FormGroup;  
  isModalOpen = false;
  isCalendarOpen = false;
  images: string[] = [];
  
  async closePopover() {
    await this.popoverController.dismiss();
  }
  openCalendar() {
    this.isCalendarOpen = true;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit(): void {
  }

constructor(private popoverController: PopoverController,private fb: FormBuilder,private patientService: PatientService){
  addIcons({timeOutline,calendarOutline});
  this.appointmentReschedule = this.fb.group({
    date_rdv: ['', [Validators.required]],
  });
     }

rescheduleAppointment(emailPatient:string){
  if (this.appointmentReschedule.valid) {
    const dateValue = this.appointmentReschedule.get('date_rdv')!.value;
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
  } else {
    console.log('appointment date is invalid', this.appointmentReschedule.value);
   
  }
}
}