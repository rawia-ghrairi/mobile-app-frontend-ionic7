import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonAvatar,
  IonImg,
  IonList,
  IonSearchbar,

 
 
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonAvatar,
    IonImg,
    IonList,
    IonSearchbar,
    CommonModule
  ],
})
export class AdminPageComponent implements OnInit{
  @ViewChild(IonModal) modal!: IonModal;
  doctors: any[] = [];


  
  // Define properties for form fields
  name!: string;
  email!: string;
  speciality!: string;
  description!: string;
  location!: string;
  selectedFile: File | null = null;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('speciality', this.speciality);
    formData.append('description', this.description);
    formData.append('location', this.location);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    fetch('http://localhost:5000/doctors', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Doctor added:', data);
        this.getDoctors(); // Fetch updated list
        this.modal.dismiss(this.name, 'confirm');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getDoctors() {
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => {
        this.doctors = data;
      });
  }
  
  ngOnInit() {
    this.getDoctors();
  }
  

  

  // Handle file selection
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }
}
