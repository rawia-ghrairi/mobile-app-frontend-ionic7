import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { arrowForwardOutline, pencilOutline, callOutline, chevronBackOutline, locationOutline, 
  lockOpenOutline, mailOutline, schoolOutline, trophy, water, keyOutline, arrowBackOutline,
  medicalOutline, businessOutline, informationCircleOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { LoadingController } from '@ionic/angular';
import { DoctorService } from '../services/doctor.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class AccountComponent implements OnInit {
  connectionError: boolean = false;
  profile: any = {
    name: '',
    email: '',
    role: ''
  };
  doctorDetails: any = null;
  isLoading = false;
  API_URL = environment.API_URL;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private doctorService: DoctorService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) {
    addIcons({
      arrowForwardOutline, pencilOutline, callOutline, chevronBackOutline, 
      locationOutline, lockOpenOutline, mailOutline, schoolOutline, trophy, 
      water, keyOutline, arrowBackOutline, medicalOutline, businessOutline,
      informationCircleOutline
    });
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

  goToHomePage() {
    if (this.profile.role === 'doctor') {
      this.router.navigate([`/doctor-home-page/${this.doctorDetails?._id}`]);
    } else {
      this.router.navigate(['/tabs/home']);
    }
  }

  editProfile() {
    this.router.navigate(['/tabs/update-profile'], {
      state: { 
        profile: this.profile,
        doctorDetails: this.doctorDetails 
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
