import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonMenuToggle,
  IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  arrowBackOutline,
  bagHandle,
  bagHandleOutline,
  bagHandleSharp,
  documentLockOutline,
  documentLockSharp,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  informationCircleSharp,
  keyOutline,
  keySharp,
  locationOutline,
  locationSharp,
  logOutOutline,
  logOutSharp,
  personOutline,
  personSharp,
  remove,
  star,
  ticketOutline,
  trashOutline,
} from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonIcon, 
    IonContent,
    IonText,
    IonLabel,
    IonAvatar,
    IonItem,
    IonHeader,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonMenuToggle,
    NgClass,
  ],
})
export class AppComponent {
<<<<<<< HEAD
  profile = {
    name: 'Nikki Thakur',
    email: 'nikki786@gmail.com',
  };

  pages = [
    { title: 'Home', url: '/tabs/home', icon: 'home', active: true },
    { title: 'Profile', url: '/tabs/account', icon: 'person', active: false },
    { title: 'Orders', url: '/orders', icon: 'bag-handle', active: false },
    { title: 'Addresses', url: '/addresses', icon: 'location', active: false },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'key',
      active: false,
    },
    {
      title: 'About Us',
      url: '/about',
      icon: 'information-circle',
      active: false,
    },
    {
      title: 'Privacy Policy',
      url: '/privacy',
      icon: 'document-lock',
      active: false,
    },
    { title: 'Sign Out', icon: 'log-out', route: true, active: false },
  ];

  constructor(private router: Router) {
    this.addAllIcons();
  }

=======
>>>>>>> 3b3be6adafc36dafb0c81215f9bba8c495bc1f29
  addAllIcons() {
    addIcons({
      star,
      bagHandleOutline,
      bagHandle,
      bagHandleSharp,
      trashOutline,
      add,
      remove,
      arrowBackOutline,
      ticketOutline,
      locationOutline,
      homeOutline,
      homeSharp,
      informationCircleOutline,
      informationCircleSharp,
      documentLockOutline,
      documentLockSharp,
      logOutOutline,
      logOutSharp,
      personOutline,
      personSharp,
      locationSharp,
      keyOutline,
      keySharp,
    });
  }
  profile = {
    name: 'Nikki Thakur',
    email: 'nikki786@gmail.com',
  };

  pages = [
    { title: 'Home', url: '/tabs/home', icon: 'home', active: true},
    { title: 'Profile', url: '/tabs/account', icon: 'person', active: false},
    { title: 'Orders', url: '/orders', icon: 'bag-handle', active: false},
    { title: 'Addresses', url: '/addresses', icon: 'location', active: false},
    {title: 'Change Password',url: '/password',icon: 'key',active: false,},
    {title: 'About Us',url: '/about',icon: 'information-circle', active: false,},
    {title: 'Privacy Policy',url: '/privacy',icon: 'document-lock',active: false,},
    { title: 'Sign Out', icon: 'log-out', route: true, active: false },
    {title: 'Doctors Home Page',url: '/doctor-home-page',icon: 'document-lock',active: false,}
  ];

  constructor(private router: Router) {
    this.addAllIcons();
  }

  onItemTap(page: any) {
    if (!page?.active) {
<<<<<<< HEAD
      this.pages.forEach((p) => (p.active = false)); 
=======
      this.pages.forEach((p) => (p.active = false)); // Désactive toutes les pages
>>>>>>> 3b3be6adafc36dafb0c81215f9bba8c495bc1f29
      page.active = true; 
    }
  
    if (page?.url) {
<<<<<<< HEAD
      this.router.navigateByUrl(page.url); 
=======
      this.router.navigateByUrl(page.url); // 🔥 Corrige la navigation
>>>>>>> 3b3be6adafc36dafb0c81215f9bba8c495bc1f29
    } else {
      this.logout();
    }
  }

  logout() {}
}