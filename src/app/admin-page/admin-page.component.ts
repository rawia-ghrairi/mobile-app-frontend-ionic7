import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonicModule,
    CommonModule
  ],
})
export class AdminPageComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  doctors: any[] = [];

  constructor(private doctorService: DoctorService) { }
  
  // Define properties for form fields
  name!: string;
  email!: string;
  speciality!: string;
  description!: string;
  location!: string;
  phone!: string;
  selectedFile: File | null = null;
  selectedImageService: File | null = null;

  isModalOpen = false;
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  confirm() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('speciality', this.speciality);
    formData.append('description', this.description);
    formData.append('location', this.location);
    formData.append('phone', this.phone);
    if (this.selectedFile) {
      formData.append('imageDoctor', this.selectedFile);
    }
    if (this.selectedImageService) {
      formData.append('imageService', this.selectedImageService);
    }
    
    this.doctorService.addDoctors(formData).subscribe(
      (data: any) => {
        console.log('Doctor added successfully:', data);
        this.getDoctors(); // Fetch updated list
        this.setOpen(false);
        this.resetForm();
      },
      (error: any) => {
        console.error('Register error:', error);
      }
    );
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (data: any) => {
        this.doctors = data;
      }, error => {
        console.error("Error doctors", error);
      }
    )
  }

  ngOnInit() {
    this.getDoctors();
  }
  
  // Handle file selection(image of doctor)
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  // Handle the image of the service
  onImageServiceSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageService = fileInput.files[0];
      console.log('Selected file:', this.selectedImageService.name);
    }
  }
}