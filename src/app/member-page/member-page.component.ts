import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItemDivider,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, chevronForwardCircle, menuOutline, notifications } from 'ionicons/icons';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/interfaces/member.interface';
import { MembersComponent } from "../members/members.component";


@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItemDivider,
    MembersComponent
],
})
export class MemberPageComponent  implements OnInit {

  members = signal<Member[]>([]);
  private memberService = inject(MemberService);

  constructor() {
    addIcons({
      menuOutline,
      notifications,
      addCircle,
      chevronForwardCircle,
    });
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.members.set(this.memberService.getMembers());
  }

}
