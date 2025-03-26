import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonContent, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { arrowBackOutline, cameraOutline, chevronBackOutline, schoolOutline } from 'ionicons/icons';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFooter, IonButton, IonLabel, IonInput,
    IonList, IonItem, IonAvatar, IonIcon, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule]
})
export class UpdateProfilePage implements OnInit {
constructor(private router: Router) {
     addIcons({arrowBackOutline,chevronBackOutline,cameraOutline,schoolOutline}); 
          }
   
          goToProfilePage(){
            this.router.navigate(['/tabs/account']); 
          }
  ngOnInit() {
  }

}
