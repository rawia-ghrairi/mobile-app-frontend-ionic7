import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonCard,
  NavController,
  IonRow,
  IonCol,
  IonItemDivider,
  IonCardHeader,
  IonLabel,
  IonCardContent, IonInput, IonItem, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircle,
  ban,
  barbell,
  call,
  chatboxEllipses,
  logoWhatsapp,
  notifications,
  person,
} from 'ionicons/icons';
import { MemberPersonalDetailComponent } from '../member-personal-detail/member-personal-detail.component';
import { Member } from 'src/app/interfaces/member.interface';
import { ActivatedRoute } from '@angular/router';

import { InfoCardComponent } from 'src/app/widgets/info-card/info-card.component';
import { ActionButtonComponent } from 'src/app/widgets/action-button/action-button.component';
import { MemberService } from '../services/member.service';
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { UploadFilesComponent } from "../upload-files/upload-files.component";
import { OverlayEventDetail } from '@ionic/core/components';
import { DoctorService } from '../services/doctor.service';
@Component({
  selector: 'app-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
  standalone: true,
  imports: [IonModal, IonItem, IonInput, 
    IonCardContent,
    IonLabel,
    IonCardHeader,
    IonItemDivider,
    IonCol,
    IonRow,
    IonCard,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    MemberPersonalDetailComponent,
    InfoCardComponent,
    ActionButtonComponent,
    ImageUploadComponent,
    UploadFilesComponent
],
})
export class MemberDetailPageComponent  implements OnInit {
languages:String="Arabe/French"
urgence:String="Yes"
consultationPrice:String="80 $"
paymentMethods:String="Cash"
  member:any;
  id!: number;

  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private doctorService = inject(DoctorService);

  constructor() {
    addIcons({
      addCircle,
      notifications,
      call,
      logoWhatsapp,
      chatboxEllipses,
      person,
      barbell,
      ban,
    });
  }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('ids');
    console.log('Doctor ID:', _id);
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.member = data;  // Set doctor if found
            console.log(this.member);
            console.log('Doctor data:', this.member);  // Log for debugging
          } else {
            console.error('Doctor not found with id:', _id);  // Handle case where doctor is not found
          }
        },
        (error) => {
          console.error('Error fetching doctor data:', error);
        }
      );
    }
  }

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }



  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
}
