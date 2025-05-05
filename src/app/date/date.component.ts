import { Component } from '@angular/core';
import { IonDatetime} from '@ionic/angular/standalone';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  standalone: true,
  imports: [ IonDatetime],
})
export class DateComponent  {
 
  constructor(private calendarService: CalendarService) {}
  occupiedDates = new Set<string>();

  ngOnInit() {
    this.calendarService.getOccupiedDates().subscribe(dates => {
      this.occupiedDates = new Set(dates);
    });
  }

  highlightedDates = (isoString: string) => {
    const dateStr = isoString.split('T')[0];
    
    if (this.occupiedDates.has(dateStr)) {
      return {
        textColor: '#ffffff',
        backgroundColor: '#ff0000',
        borderRadius: '50%'
      };
    }
    
    return {
      textColor: '#000000',
      backgroundColor: '#f5f5f5',
      borderRadius: '50%'
    };
  };
}
