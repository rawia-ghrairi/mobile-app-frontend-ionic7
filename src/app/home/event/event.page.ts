import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DailyScheduleComponent} from "../../daily-schedule/daily-schedule.component";
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { DateComponent } from "../../date/date.component";
import { FormBookAppointmentComponent } from 'src/app/form-book-appointment/form-book-appointment.component';
import { IonicModule } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonicModule,
    FormBookAppointmentComponent,
    DateComponent,
    DailyScheduleComponent],
})
export class EventPage implements OnInit {
  doctor: any;
  constructor() {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }


  private route = inject(ActivatedRoute);
  private doctorService = inject(DoctorService);

  

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    console.log('Doctor ID:', _id);
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.doctor = data;  // Set doctor if found
            console.log('Doctor data:', this.doctor);  // Log for debugging
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

}
