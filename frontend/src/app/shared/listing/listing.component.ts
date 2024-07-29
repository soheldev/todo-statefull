// src/app/listing/listing.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];
  @Input() title: string = '';
  @Input() showActiveToggle: boolean = true;
  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onToggleActive = new EventEmitter<{
    id: string;
    isActive: boolean;
  }>();

  handleDelete(item: any) {
    this.onDelete.emit(item);
  }

  handleView(item: any) {
    this.onView.emit(item);
  }

  handleEdit(item: any) {
    this.onEdit.emit(item);
  }

  toggleActive(id: string, isActive: boolean) {
    this.onToggleActive.emit({ id, isActive });
  }

  // New method to handle checkbox change
  handleToggleActive(id: string, event: Event) {
    const isActive = (event.target as HTMLInputElement).checked;
    this.toggleActive(id, isActive);
  }
}