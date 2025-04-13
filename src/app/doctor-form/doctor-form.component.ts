import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent {
  @Output() doctorCreated = new EventEmitter<any>();

  doctorData = {
    fullName: '',
    email: '',
    imageDoctor: '',
    description: '',
    location: '',
    speciality: '',
    imageService: '',
  };

  // Close the modal without saving
  closeModal() {
    this.doctorCreated.emit(null);
  }

  // Handle image's service selection
  onImageServiceChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.doctorData.imageService = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  // Handle image's Doctor selection
  onImageDoctorChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.doctorData.imageDoctor = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit the form and add a new doctor
  submitForm() {
    this.doctorCreated.emit(this.doctorData);
  }
}
