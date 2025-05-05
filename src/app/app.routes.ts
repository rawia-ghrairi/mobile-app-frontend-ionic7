import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome', // Redirect to the welcome page first
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage),
  },

  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.component').then((m) => m.TabsComponent),
    children: [
      {
        path: '',
        redirectTo: '/tabs/home', // Default to home when accessing tabs
        pathMatch: 'full',
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
          },
          
        ],
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./member-page/member-page.component').then(
                (m) => m.MemberPageComponent
              ),
          },
          {
            path: ':ids',
            loadComponent: () =>
              import('./member-detail-page/member-detail-page.component').then(
        
                (m) => m.MemberDetailPageComponent
              ),
          },
        ],
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      {
        path: 'update-profile',
        loadComponent: () => import('./update-profile/update-profile.page').then( m => m.UpdateProfilePage)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage)
      },
      // You can add other routes here, like stats or any additional pages
    ],
    
  },
  {
    path: 'home', // New route for home and events
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'events/:_id',
        loadComponent: () =>
          import('./home/event/event.page').then((m) => m.EventPage),
      },
      {
        path: 'services/:_id',
        loadComponent: () => import('./home/speciality/speciality.page').then( m => m.SpecialityPage)
      },
    ],
  },

  { path: 'reset-password/:token', component: ResetPasswordComponent },


  {
    path: 'update-profile',
    loadComponent: () => import('./update-profile/update-profile.page').then( m => m.UpdateProfilePage)
  },
  {
    path: 'doctor-home-page/:_id',
    loadComponent: () => import('./doctor-home-page/doctor-home-page.page').then( m => m.DoctorHomePagePage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'admin-page',
    loadComponent: () => import('./admin-page/admin-page.component').then( m => m.AdminPageComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth-component/auth-component.component').then( m => m.AuthComponentComponent)
  },
 


 
];