import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonMenuToggle,
  IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  arrowBackOutline,
  bagHandle,
  bagHandleOutline,
  bagHandleSharp,
  documentLockOutline,
  documentLockSharp,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  informationCircleSharp,
  keyOutline,
  keySharp,
  locationOutline,
  locationSharp,
  logOutOutline,
  logOutSharp,
  personOutline,
  personSharp,
  remove,
  settingsOutline,
  star,
  ticketOutline,
  trashOutline,
} from 'ionicons/icons';

import { LoadingController } from '@ionic/angular';

import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';
import { DoctorService } from './services/doctor.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [MbscModule, FormsModule,  IonicModule,
    NgClass,
  ],
})
export class AppComponent implements OnInit {
   connectionError: boolean = false;
    profile: any = {
      name: '',
      email: '',
      role: ''
    };
    doctorDetails: any = null;
    isLoading = false;
    API_URL = environment.API_URL;
  addAllIcons() {
    addIcons({
      star,
      settingsOutline,
      bagHandleOutline,
      bagHandle,
      bagHandleSharp,
      trashOutline,
      add,
      remove,
      arrowBackOutline,
      ticketOutline,
      locationOutline,
      homeOutline,
      homeSharp,
      informationCircleOutline,
      informationCircleSharp,
      documentLockOutline,
      documentLockSharp,
      logOutOutline,
      logOutSharp,
      personOutline,
      personSharp,
      locationSharp,
      keyOutline,
      keySharp,
    });
  }


  pages = [
    { title: 'Home', url: '/tabs/home', icon: 'home', active: true},
    { title: 'Profile', url: '/tabs/account', icon: 'key', active: false},
    { title: 'Admin', url: '/admin-page', icon: 'person', active: false},
    { title: 'Sign Out', icon: 'log-out', route: true, active: false },
    {title: 'Doctors Home Page',url: '/auth',icon: 'document-lock',active: false,}
  ];

  constructor(private router: Router, 
      private doctorService: DoctorService,
      private loadingCtrl: LoadingController,
      private http: HttpClient) {
    this.addAllIcons();
  }

  onItemTap(page: any) {
    if (!page?.active) {
      this.pages.forEach((p) => (p.active = false)); // Désactive toutes les pages
      page.active = true; 
    }
  
    if (page?.url) {
      this.router.navigateByUrl(page.url); // 🔥 Corrige la navigation
    } else {
      this.logout();
    }
  }
  ngOnInit() {
    this.loadProfileData();
  }


  async loadProfileData() {
    this.isLoading = true;
    
    // Get basic user info from localStorage
    const storedRole = localStorage.getItem('role');
    const storedEmail = localStorage.getItem('email');
    
    this.profile = {
      name: storedEmail?.split('@')[0] || 'User',
      email: storedEmail || '',
      role: storedRole || ''
    };
    
    console.log('Basic profile info:', this.profile);
    
    // If user is a doctor, fetch doctor details
    if (this.profile.role === 'doctor' && this.profile.email) {
      try {
        // Fetch doctor details by email
        await this.fetchDoctorDetailsByEmail(this.profile.email);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    }
    
    this.isLoading = false;
  }
  
  async fetchDoctorDetailsByEmail(email: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    try {
      // Make a direct API call to get doctor details by email
      const response: any = await firstValueFrom(
        this.http.get(`${this.API_URL}doctor-by-email/${email}`, { headers })
      );
      
      console.log('Doctor details response:', response);
      
      if (response && response.doctor) {
        this.doctorDetails = response.doctor;
        
        // Update profile with additional info
        if (this.doctorDetails.name) {
          this.profile.name = this.doctorDetails.name;
        }
      } else {
        console.warn('No doctor details found for email:', email);
      }
    } catch (error) {
      console.error('Error fetching doctor by email:', error);
      // Try to fetch using getDoctors and filter by email
      this.fetchDoctorFromList(email);
    }
  }
  
  async fetchDoctorFromList(email: string) {
    try {
      const doctors: any[] = await firstValueFrom(this.doctorService.getDoctors());
      const doctor = doctors.find(d => d.email === email);
      
      if (doctor) {
        this.doctorDetails = doctor;
        if (doctor.name) {
          this.profile.name = doctor.name;
        }
      }
    } catch (error) {
      console.error('Error fetching doctors list:', error);
    }
  }
  logout() {}
}