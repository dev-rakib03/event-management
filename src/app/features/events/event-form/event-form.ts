import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTask, EventCategory, EventStatus } from '../../../mock-event';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.html',
  styleUrls: ['./event-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EventForm implements OnInit {
  @Input() eventTask?: EventTask;
  @Output() save = new EventEmitter<EventTask>();
  @Output() cancel = new EventEmitter<void>();

  eventForm!: FormGroup;

  categories = EventCategory;
  statuses = EventStatus;

  // Keys typed as enum keys to satisfy TS
  categoriesKeys = Object.keys(EventCategory).filter(k => isNaN(Number(k))) as (keyof typeof EventCategory)[];
  statusesKeys = Object.keys(EventStatus).filter(k => isNaN(Number(k))) as (keyof typeof EventStatus)[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [this.eventTask?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.eventTask?.description || '', Validators.required],
      category: [this.eventTask?.category ?? EventCategory.Workshop, Validators.required],
      status: [this.eventTask?.status ?? EventStatus.Draft, Validators.required],
      eventData: [this.formatDateInput(this.eventTask?.eventData) || '', Validators.required],
      location: [this.eventTask?.location || '', Validators.required],
      attendees: [this.eventTask?.attendees ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  private formatDateInput(date?: Date): string | null {
    if (!date) return null;
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  getStatusValue(key: keyof typeof EventStatus): number {
    return this.statuses[key];
  }

  getCategoryValue(key: keyof typeof EventCategory): number {
    return this.categories[key];
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formValue = this.eventForm.value;

    const eventToSave: EventTask = {
      id: this.eventTask?.id || 0,
      title: formValue.title,
      description: formValue.description,
      category: +formValue.category,
      status: +formValue.status,
      eventData: new Date(formValue.eventData),
      createdAt: this.eventTask?.createdAt || new Date(),
      attendees: +formValue.attendees,
      location: formValue.location,
    };

    this.save.emit(eventToSave);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
