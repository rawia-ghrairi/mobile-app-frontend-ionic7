import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { arrowForwardOutline,pencilOutline, callOutline, chevronBackOutline, locationOutline, lockOpenOutline, mailOutline, schoolOutline, trophy, water, keyOutline, arrowBackOutline } from 'ionicons/icons';
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
 profile = {
    name: 'Nikki Thakur',
    email: 'nikki786@gmail.com',
  };
  constructor(private router: Router) {
      addIcons({arrowBackOutline,schoolOutline,mailOutline,locationOutline,callOutline,keyOutline,pencilOutline,lockOpenOutline,arrowForwardOutline,water,trophy}); 
      }
      ngOnInit(){}

      goToHomePage() {
        this.router.navigate(['/tabs/home']); // Remplacez '/home' par le chemin de votre page d'accueil
      }
      editProfile(){
        this.router.navigate(['/tabs/update-profile']);
      }
}
