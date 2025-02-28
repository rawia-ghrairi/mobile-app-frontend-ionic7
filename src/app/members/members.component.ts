import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonCard,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { MemberPersonalDetailComponent } from '../member-personal-detail/member-personal-detail.component';
import { InfoCardComponent } from "./../widgets/info-card/info-card.component";
import { Member } from '../interfaces/member.interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonCard,
    RouterLink,
    MemberPersonalDetailComponent,
    InfoCardComponent
],
})
export class MembersComponent  implements OnInit {

  member = input<Member>();

  constructor() {}

  ngOnInit() {}

}
