import { NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonFooter,
  IonToolbar,
  IonButton,
  IonText,
  IonicSlides,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonToolbar,
    IonFooter,
    IonContent,
    RouterLink,
    NgStyle,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage implements OnInit {
  onboardingScreens = [
    { image: '11.png' },
    { image: '22.png' },
    { image: '33.jpg' },
  ];
  swiperModules = [IonicSlides];

  constructor() {}

  ngOnInit() {}
}
