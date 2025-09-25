import { Component, OnInit } from '@angular/core';
// import { MockEvent } from '../../../mock-event';
import { MockEvent, EventTask, EventCategory, EventStatus } from '../../../mock-event'; // adjust path as needed
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css'],
  imports: [CommonModule,RouterModule,FormsModule]
})
export class EventList implements OnInit {
  events: EventTask[] = [];
  filteredEvents: EventTask[] = [];
  searchTerm: string = '';

  eventCategory = EventCategory; // To use in template for enum display
  eventStatus = EventStatus;

  constructor(private mockEvent: MockEvent) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.mockEvent.getEventTasks().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    );
  }

  onAdd() {
    alert('Add new event - implement your logic here');
  }

  onEdit(event: EventTask) {
    alert(`Edit event: ${event.title} - implement your logic here`);
  }

  onDelete(event: EventTask) {
    if(confirm(`Are you sure you want to delete "${event.title}"?`)) {
      this.mockEvent.deleteEventTask(event.id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  // Utility method to get enum names as strings
  getCategoryName(cat: EventCategory) {
    return EventCategory[cat];
  }

  getStatusName(status: EventStatus) {
    return EventStatus[status];
  }
}
