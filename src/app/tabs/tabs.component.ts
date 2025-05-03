import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  currentTab = signal<string>('home'); // Changé à 'home' par défaut

  constructor(private router: Router) {
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
  getCurrentTab(event: { tab: string }) {
    if (event.tab === 'members') {
      this.handleMembersTabClick();
      return false; // Empêche la navigation par défaut
    } else {
      this.currentTab.set(event.tab);
      return true;
    }
  }
  ngOnInit(): void {
    
  }
  handleMembersTabClick() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      this.currentTab.set('members');
      this.router.navigate(['/tabs/members']);
    } else {
      localStorage.setItem('redirect_url', '/tabs/members');
      this.router.navigate(['/auth']);
      this.currentTab.set('home');
    }
  }
  }

