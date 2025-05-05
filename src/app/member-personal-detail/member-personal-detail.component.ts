import {
  IonItem,
  IonLabel,
  IonButton,
  IonThumbnail,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { Component, Input,input, OnInit } from '@angular/core';
import { Member } from '../interfaces/member.interface';



@Component({
  selector: 'app-member-personal-detail',
  templateUrl: './member-personal-detail.component.html',
  styleUrls: ['./member-personal-detail.component.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonButton, IonLabel, IonItem, IonThumbnail],
})
export class MemberPersonalDetailComponent  implements OnInit {
 @Input() member: any;
  isList = input<boolean>(true);
  constructor() { }

  ngOnInit() {}

}
