import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
import { CalendarService } from '../services/calendar.service';
@Component({
  selector: 'app-form-book-appointment',
  templateUrl: './form-book-appointment.component.html',
  styleUrls: ['./form-book-appointment.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
  ]
})
export class FormBookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  occupiedDates = new Set<string>();
  doctorsId:any
  constructor(private calendarService: CalendarService,private toastController: ToastController,private router: Router,private authservice:AuthService,private route:ActivatedRoute,private fb: FormBuilder, private patient: PatientService) { 
    addIcons({heartOutline});
    this.appointmentForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      photo: [null, [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date_rdv: ['', [Validators.required]],
      doctor_id: [''],
    });
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.appointmentForm.patchValue({
        photo: file
      });
    }
  }


highlightedDates = (isoString: string) => {
  const dateStr = isoString.split('T')[0];
  
  if (this.occupiedDates.has(dateStr)) {
    return {
      textColor: '#ffffff',
      backgroundColor: '#ff0000',
      borderRadius: '50%'
    };
  }
  
  return {
    textColor: '#000000',
    backgroundColor: '#ffffff',
    borderRadius: '50%'
  };
};



  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.doctorsId = this.route.snapshot.paramMap.get('_id');
    this.appointmentForm.patchValue({ doctor_id: this.doctorsId});
    console.log(this.doctorsId);
    this.calendarService.getOccupiedDates().subscribe(dates => {
      this.occupiedDates = new Set(dates);
    });
    
  }

  handleAppointmentClick() {
    const isAuthenticated = this.authservice.isLoggedIn();
    if (isAuthenticated) {
      this.setOpen(true);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  bookAppointment() {
    if (this.appointmentForm.valid) {
      const formData = new FormData();
      
      Object.keys(this.appointmentForm.controls).forEach(key => {
        const value = this.appointmentForm.get(key)?.value;
        if (value !== null && value !== undefined && key !== 'photo' && key !== 'date_rdv') {
          formData.append(key, value);
        }
      });
  
      const dateValue = this.appointmentForm.get('date_rdv')?.value;
      if (dateValue) {
        const formattedDate = new Date(dateValue).toISOString().slice(0, 19).replace("T", " ");
        formData.append('date_rdv', formattedDate);
      }
      // Ajoutez le fichier photo
      const photoFile = this.appointmentForm.get('photo')?.value;
      if (photoFile) {
        formData.append('photo', photoFile);
         }
  
      this.patient.patientRegister(formData).subscribe(
        (data: any) => {
          
          console.log('Appointment booked successfully:', data);
          this.presentToast('Appointment booked successfully!', 'success');
          this.resetForm();
          this.setOpen(false); // Fermer le modal après succès
        },
        (error: any) => {
          console.error('Register error:', error);
          
          if (error.error?.message) {
            this.presentToast(error.error.message, 'danger');
          } else {
            this.presentToast('Failed to book appointment. Please try again.', 'danger');
          }
        }
      );
    } else {
      console.log('Form is invalid', this.appointmentForm.value);
      this.markFormGroupTouched(this.appointmentForm);
      this.presentToast('Please fill out all required fields correctly.', 'warning');
    }
  }
  
  // Ajoutez cette méthode pour marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  private resetForm() {
    this.appointmentForm.reset({
      name: '',
      age: '',
      address: '',
      gender: '',
      photo: '',
      phone: '',
      email: '',
      date_rdv: '',
      doctor_id: this.doctorsId
    });
  }
}