import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum EventCategory {
  Workshop,
  Seminar,
  Social,
  Club,
  Meeting
}

export enum EventStatus {
  Draft,
  Scheduled,
  Ongoing,
  Completed,
  Cancelled
}

export interface EventTask {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  eventData: Date;
  createdAt: Date;
  attendees: number;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockEvent {
  private eventTasks: EventTask[] = [
    {
      id: 1,
      title: 'Angular Conference',
      description: 'A conference about Angular best practices.',
      category: EventCategory.Workshop,
      status: EventStatus.Scheduled,
      eventData: new Date('2024-07-01T09:00:00'),
      createdAt: new Date('2024-06-01T10:00:00'),
      attendees: 50,
      location: 'Dhaka, Bangladesh'
    },
    {
      id: 2,
      title: 'Monthly Club Meeting',
      description: 'Regular monthly meeting for club members.',
      category: EventCategory.Club,
      status: EventStatus.Draft,
      eventData: new Date('2024-07-10T18:00:00'),
      createdAt: new Date('2024-06-05T12:00:00'),
      attendees: 20,
      location: 'Chittagong, Bangladesh'
    },
    {
      id: 3,
      title: 'Tech Seminar',
      description: 'Seminar on emerging technologies.',
      category: EventCategory.Seminar,
      status: EventStatus.Ongoing,
      eventData: new Date('2024-06-20T14:00:00'),
      createdAt: new Date('2024-06-10T09:30:00'),
      attendees: 100,
      location: 'Sylhet, Bangladesh'
    },
    {
      id: 4,
      title: 'Team Building Social',
      description: 'Social event for team building activities.',
      category: EventCategory.Social,
      status: EventStatus.Completed,
      eventData: new Date('2024-06-15T16:00:00'),
      createdAt: new Date('2024-05-30T11:00:00'),
      attendees: 35,
      location: 'Khulna, Bangladesh'
    },
    {
      id: 5,
      title: 'Project Kickoff Meeting',
      description: 'Initial meeting to kick off the new project.',
      category: EventCategory.Meeting,
      status: EventStatus.Scheduled,
      eventData: new Date('2024-07-05T10:00:00'),
      createdAt: new Date('2024-06-20T15:00:00'),
      attendees: 15,
      location: 'Rajshahi, Bangladesh'
    }
  ];

  getEventTasks(): Observable<EventTask[]> {
    return of(this.eventTasks);
  }

  getEventTaskById(id: number): Observable<EventTask | undefined> {
    return of(this.eventTasks.find((u) => u.id === id));
  }

  createEventTask(eventTask: EventTask): Observable<EventTask> {
    const newEventTask = { ...eventTask, id: this.eventTasks.length + 1 };
    this.eventTasks.push(newEventTask);
    return of(newEventTask);
  }

  updateEventTask(eventTask: EventTask): Observable<EventTask> {
    const idx = this.eventTasks.findIndex((u) => u.id === eventTask.id);
    if (idx > -1) this.eventTasks[idx] = eventTask;
    return of(eventTask);
  }

  deleteEventTask(id: number): Observable<void> {
    this.eventTasks = this.eventTasks.filter((u) => u.id !== id);
    return of();
  }
}
