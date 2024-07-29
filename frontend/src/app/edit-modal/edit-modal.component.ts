import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeMasterService } from '../expense-type-master/type-master.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  editForm!: FormGroup;
  taskList: string[] = [];
  isExpense: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private typeMasterService: TypeMasterService
  ) {
    this.isExpense = 'amount' in data;
    this.createForm();
  }

  ngOnInit() {
    this.loadTasks();
  }

  createForm() {
    if (this.isExpense) {
      this.editForm = this.fb.group({
        _id: [this.data._id],
        type: [this.data.type, Validators.required],
        title: [this.data.title, [Validators.required, Validators.minLength(6)]],
        description: [this.data.description, [Validators.required, Validators.minLength(15)]],
        date: [this.data.date, Validators.required],
        amount: [this.data.amount, [Validators.required, Validators.min(1)]],
        tags: this.fb.array(this.data.tags ? this.data.tags.map((tag: any) => this.fb.group(tag)) : [])
      });
    } else {
      this.editForm = this.fb.group({
        _id: [this.data._id],
        type: [this.data.type, Validators.required]
      });
    }
  }

  loadTasks() {
    this.typeMasterService.getTypes().subscribe(
      (types) => {
        this.taskList = types.map(t => t.type);
      },
      (error) => {
        console.error('Error loading types:', error);
      }
    );
  }

  get tags() {
    return this.editForm.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.group({ key: '', value: '' }));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  save(): void {
    if (this.editForm.valid) {
      console.log('Saving:', this.editForm.value); // Add this log
      this.dialogRef.close(this.editForm.value);
    } else {
      console.log('Form is invalid:', this.editForm.errors); // Add this log
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}