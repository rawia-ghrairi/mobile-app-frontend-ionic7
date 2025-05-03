import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { calendarOutline, callOutline, chatboxEllipsesOutline, heartOutline, locationOutline, medkitOutline } from 'ionicons/icons';
import { services } from 'src/app/data/services';
import { Event } from 'src/app/interfaces/event.interface';
import { DateComponent } from "../../date/date.component";
import { FormBookAppointmentComponent } from 'src/app/form-book-appointment/form-book-appointment.component';
import { IonicModule } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor.service';
import { CalendarService } from 'src/app/services/calendar.service';
@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.page.html',
  styleUrls: ['./speciality.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    DateComponent,
    FormBookAppointmentComponent]
})
export class SpecialityPage implements OnInit {
  service:any={};
  isExpanded = false;
  maxLength = 89;
  constructor( private route:ActivatedRoute,private doctorService :DoctorService) {
    addIcons({locationOutline,medkitOutline,callOutline,chatboxEllipsesOutline,heartOutline,calendarOutline});
  }
  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    console.log(_id);0
    if (_id) {
      this.doctorService.getDoctorById(_id).subscribe(
        (data) => {
          if (data) {
            this.service = data;  // Set doctor if found
            console.log(this.service);
            console.log('Doctor data:', this.service);  // Log for debugging
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
  getShortDescription(text: string): string {
    if (!text || text.length === 0) return '';
    else if(this.isExpanded)
      return text;
    return text.length > 50 ? text.slice(0, 50) + '...' : text;
  }
  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }
 }