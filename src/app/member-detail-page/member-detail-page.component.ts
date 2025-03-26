import { Component, inject, OnInit, signal } from '@angular/core';
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
  IonCardContent,
} from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
  standalone: true,
  imports: [
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

  member = signal<Member | null>(null);
  id!: number;

  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private memberService = inject(MemberService);

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
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) {
      this.navCtrl.back();
      return;
    }

    this.id = parseInt(id);
    this.getMemberById();
  }

  getMemberById() {
    const member = this.memberService.getMemberById(this.id);

    if (member) {
      this.member.set(member);
    }
  }

}
