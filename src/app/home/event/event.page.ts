import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { DateComponent } from "../../date/date.component";
import { FormBookAppointmentComponent } from 'src/app/form-book-appointment/form-book-appointment.component';
import { IonicModule } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonicModule,
    FormBookAppointmentComponent,
    DateComponent,
    CommonModule
    ],
})
export class EventPage implements OnInit {
  doctor: any={};
  constructor(private doctorService :DoctorService,private route:ActivatedRoute  ) {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    console.log('Doctor ID:', _id);
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.doctor = data;  // Set doctor if found
            console.log(this.doctor);
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
