import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class CalendarService {
  private apiUrl =  environment.API_URL;// Adaptez selon votre URL Flask

  constructor(private http: HttpClient) {}
  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}events`);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(`${this.apiUrl}events`, event);
  }
  deleteEvent(title: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete-event/${title}`);
  }
  getOccupiedDates(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}events`).pipe(
      map((events:any) => events.map((event:any) => event.start.split('T')[0]))
    );
  }
}