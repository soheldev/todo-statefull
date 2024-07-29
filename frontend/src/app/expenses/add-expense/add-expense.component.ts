import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { TypeMasterService } from '../../expense-type-master/type-master.service';

interface Tag {
  key: string;
  value: string;
}

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  taskList: string[] = [];
  maxDate!: string;
  minDate!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService,
    private typeMasterService: TypeMasterService
  ) {
    this.expenseForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      date: ['', [Validators.required, this.dateRangeValidator.bind(this)]],
      amount: [null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
      tags: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadTasks();
    this.setMinMaxDates();
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

  setMinMaxDates() {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setMonth(today.getMonth() - 2);

    this.maxDate = today.toISOString().split('T')[0];
    this.minDate = pastDate.toISOString().split('T')[0];
  }

  closeModal() {
    this.router.navigate(['/expenses']);
  }

  saveExpense() {
    if (this.expenseForm.valid) {
      this.expenseService.addExpense(this.expenseForm.value).subscribe(
        (newExpense) => {
          alert('Expense saved successfully!');
          this.router.navigate(['/expenses']);
        },
        (error) => {
          console.error('Error adding expense:', error);
          alert('Error saving expense. Please try again.');
        }
      );
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }


  addTag() {
    this.tags.push(this.fb.group({ key: '', value: '' }));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  get tags() {
    return this.expenseForm.get('tags') as FormArray;
  }

  dateRangeValidator(control: any) {
    const dateValue = new Date(control.value);
    const minDate = new Date(this.minDate);
    const maxDate = new Date(this.maxDate);

    if (control.value && (dateValue < minDate || dateValue > maxDate)) {
      return { dateRange: true };
    }
    return null;
  }
  
}