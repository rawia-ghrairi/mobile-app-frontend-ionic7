import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-form-book-appointment',
  templateUrl: './form-book-appointment.component.html',
  styleUrls: ['./form-book-appointment.component.scss'],
  standalone:true,
  imports:[
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ]
})
export class FormBookAppointmentComponent  implements OnInit {
  appointmentForm: FormGroup;
  doctorsId:any
  constructor(private toastController: ToastController,private router: Router,private authservice:AuthService,private route:ActivatedRoute,private fb: FormBuilder, private patient: PatientService) { 
    addIcons({heartOutline});
    this.appointmentForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      phone:  ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date_rdv: ['', [Validators.required]],
      doctor_id: [''],
    });
  }

selectedPhotoFile: File | null = null;

onPhotoSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedPhotoFile = file;
    this.appointmentForm.patchValue({ photo: file.name }); // juste pour l’affichage
  }
}


  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  ngOnInit() {
    this.doctorsId=this.route.snapshot.paramMap.get('_id');
    console.log(this.doctorsId);
    
  }
  // Cette fonction est appelée au clic
handleAppointmentClick() {
  const isAuthenticated = this.authservice.isLoggedIn(); // ✅ méthode à définir selon ton auth
  if (isAuthenticated) {
    this.setOpen(true);
  } else {
    this.router.navigate(['/auth']);
  }
}
  
  //async → la fonction est asynchrone(elle peut contenir des opérations asynchrones avec await)
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({// Création d’un toast
      message,
      duration: 3000, // Temps d'affichage en millisecondes
      position: 'top',
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present(); //Affiche le toast à l'écran.
   //await → Attend que le toast soit affiché avant de continuer l’exécution du code.
  }
  
  bookAppointment() {
    
    if (this.appointmentForm.valid) {
      const dateValue = this.appointmentForm.get('date_rdv')!.value;
      const formattedDate = dateValue ? new Date(dateValue).toISOString().slice(0, 19).replace("T", " ") : null;
      const patientData = {
        name: this.appointmentForm.get('name')!.value,
        age: this.appointmentForm.get('age')!.value,
        address: this.appointmentForm.get('address')!.value,
        gender: this.appointmentForm.get('gender')!.value,
        photo: this.appointmentForm.get('photo')!.value,
        phone: this.appointmentForm.get('phone')!.value,
        email: this.appointmentForm.get('email')!.value,

        date_rdv: formattedDate,
        doctor_id:this.doctorsId
      };
      console.log('patient is:', patientData);
      this.patient.patientRegister(patientData).subscribe(
        (data: any) => {
          console.log('Appointment booked successfully:', data);
          this.presentToast('Appointment booked successfully!', 'success');
          this.appointmentForm = this.fb.group({
            name: ['', [Validators.required]],
            age: ['', [Validators.required]],
            address: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            photo: ['', [Validators.required]],
            phone:  ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            date_rdv: ['', [Validators.required]],
            doctor_id: [''],
          });
        },
        (error: any) => {
          console.error('Register error:', error);
         this.presentToast('Failed to book appointment. Please try again.', 'danger');

        }
      );
    } else {
      console.log('patient form is invalid', this.appointmentForm.value);
      this.presentToast('Please fill out all required fields correctly.', 'warning');
     
    }
  }
}
