import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MbscCalendarEvent, MbscEventcalendarOptions, Notifications, setOptions, MbscPopup } from '@mobiscroll/angular';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
setOptions({
  theme: 'ios',
  themeVariant: 'light',
});

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  standalone: true,
  styleUrls: ['./daily-schedule.component.scss'],
  providers: [Notifications],
  imports: [MbscModule,FormsModule],
})
export class DailyScheduleComponent implements OnInit {
  @ViewChild('eventPopup') eventPopup!: MbscPopup;

  myEvents: MbscCalendarEvent[] = [];
  newEvent: MbscCalendarEvent = { start: new Date(), end: new Date(), title: '', color: '' };

  eventColors: string[] = ['#ff4d4d', '#4da6ff', '#47d147', '#ffcc00', '#aa66cc', '#ff9933']; // Predefined colors

  myOptions: MbscEventcalendarOptions;

  constructor(private http: HttpClient, private notify: Notifications) {
    this.myOptions = {
      clickToCreate: true,
      dragToCreate: true,
      dragToMove: true,
      dragToResize: true,
      eventDelete: true,
      view: {
        schedule: { type: 'day' },
      },
      onEventClick: (args) => {
        this.notify.toast({
          message: args.event.title,
        });
      },
      onEventCreate: (args) => {
        this.newEvent = args.event;
        this.newEvent.color = this.getRandomColor(); // Assign a random color
        this.eventPopup.open();
      },
    };
  }

  ngOnInit(): void {
    this.http
      .jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback')
      .subscribe((resp) => {
        this.myEvents = resp;
      });
  }

  getRandomColor(): string {
    return this.eventColors[Math.floor(Math.random() * this.eventColors.length)];
  }

  saveEvent(): void {
    if ((this.newEvent.title ?? '').trim()) {
      this.myEvents = [...this.myEvents, this.newEvent]; // Add event
      this.eventPopup.close();
    }
  }

  closePopup(): void {
    this.eventPopup.close();
  }
}
