import { Component, OnInit, signal } from '@angular/core';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  personOutline,
  calendarOutline,
  peopleOutline,
  home,
  people,
  person,
  calendar,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonTabs],
})
export class TabsComponent  implements OnInit {

  currentTab = signal<string>('members');
  constructor() {
    addIcons({
      home,
      homeOutline,
      peopleOutline,
      calendarOutline,
      personOutline,
      people,
      person,
      calendar,
    });
  }

  ngOnInit() {}
  getCurrentTab(event: { tab: string }) {
    console.log(event.tab);

    this.currentTab.set(event.tab);
  }

}
