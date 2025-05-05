import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { arrowForwardOutline,pencilOutline, callOutline, chevronBackOutline, locationOutline, lockOpenOutline, mailOutline, schoolOutline, trophy, water, keyOutline, arrowBackOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Ajoute ceci pour importer tous les composants Ionic(Gère automatiquement IonItem, IonHeader, etc.)
  ]
  })
export class AccountComponent  implements OnInit {
  profile: any = {
    name: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

   ngOnInit() {
     this.loadProfileData();
  }

 loadProfileData() {
    
      this.profileService.getUserProfile().subscribe((profile) => {
        this.profile =profile;
      
        console.log('Doctors isra:', this.profile); // This will log the doctor data
      });
  
  }
  goToHomePage() {
    this.router.navigate(['/tabs/home']);
  }

  editProfile() {
    this.router.navigate(['/tabs/update-profile'], {
      state: { profile: this.profile }
    });
  }

  logout() {
    this.authService.logout();
  }
}
