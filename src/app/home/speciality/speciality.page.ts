import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { calendarOutline, callOutline, chatboxEllipsesOutline, heartOutline, locationOutline, medkitOutline } from 'ionicons/icons';
import { services } from 'src/app/data/services';
import { Event } from 'src/app/interfaces/event.interface';
import { DateComponent } from "../../date/date.component";
import { FormBookAppointmentComponent } from 'src/app/form-book-appointment/form-book-appointment.component';
import { IonicModule } from '@ionic/angular';
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

  service!: Event;

  private route = inject(ActivatedRoute);
  isExpanded = false;
  maxLength = 89;
  constructor() {
    addIcons({locationOutline,medkitOutline,callOutline,chatboxEllipsesOutline,heartOutline,calendarOutline});
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.getService(id);
    }
  }
  getService(id: string) {
    this.service = services.find((service) => service.id == id)!;
  }
  getShortDescription(): string {
    if (this.isExpanded) {
      return this.service.description;
    }
    return this.service.description.length > this.maxLength ? this.service.description.substring(0, this.maxLength) + '...' 
      : this.service.description;
  }
  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

}
