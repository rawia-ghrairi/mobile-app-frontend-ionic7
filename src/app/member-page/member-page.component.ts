import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonMenuButton,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, chevronForwardCircle, menuOutline, notifications } from 'ionicons/icons';
import { Member } from 'src/app/interfaces/member.interface';
import { MemberService } from 'src/app/services/member.service';
import { MembersComponent } from "../members/members.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss'],
  standalone: true,
  imports: [CommonModule,
    IonicModule,
    MembersComponent
],
})
export class MemberPageComponent  implements OnInit {
  isLoading = signal(true); // Ajout d'un état de chargement
  error = signal<string | null>(null); // Gestion des erreurs
  filteredDoctors : any;
  members :any
  constructor(private router:Router,private memberService:MemberService) {
    addIcons({
      menuOutline,
      notifications,
      addCircle,
      chevronForwardCircle,
    });
  }

  ngOnInit() {
    this.loadDoctors();
  }
  filterDoctors(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredDoctors = this.members.filter((doctor:any) =>
      doctor.name.toLowerCase().includes(searchTerm)
      ||doctor.speciality.toLocaleLowerCase().includes(searchTerm)
    );
  }
  loadDoctors() {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.memberService.getDoctorsByPatient().subscribe({
      next: (response) => {
        this.members=response.doctors;
        this.filteredDoctors=response.doctors;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
        this.isLoading.set(false);
        
        if (err.status === 401 || err.message === 'No authentication token found') {
          this.error.set('You must log in to access this page');
          localStorage.setItem('redirect_url', this.router.url);
          this.router.navigate(['/auth']);
        } else {
          this.error.set('Error loading doctors');
        }
      }
    });
  }

  // Optionnel: Méthode pour recharger
  refreshDoctors() {
    this.loadDoctors();
  }
}

