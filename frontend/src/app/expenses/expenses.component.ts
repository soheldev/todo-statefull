import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewModalComponent } from '../view-modal/view-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import * as ExpenseActions from '../store/actions/expense.actions';
import { ExpenseState } from '../store/reducers/expense.reducer';
import {
  selectAllExpenses,
  selectMonthlyExpenses,
} from '../store/selectors/expense.selectors';

interface Expense {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  amount: number;
  deleted: boolean;
  createdAt?: Date;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses$: Observable<Expense[]>;
  monthlyExpenses$: Observable<{ month: string; total: number }[]>;
  filteredExpenses$: BehaviorSubject<Expense[]> = new BehaviorSubject<
    Expense[]
  >([]);
  currentYear = new Date().getFullYear();

  headers = ['type', 'title', 'description', 'date', 'amount'];
  paginatedExpenses: Expense[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  searchTerm: string = '';

  constructor(private store: Store<ExpenseState>, private dialog: MatDialog) {
    this.expenses$ = this.store.select(selectAllExpenses);
    this.monthlyExpenses$ = this.store.select(selectMonthlyExpenses);
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.loadExpenses());
    this.store.dispatch(
      ExpenseActions.updateMonthlyExpenses({ year: this.currentYear })
    );

    this.expenses$.subscribe((expenses) => {
      this.filteredExpenses$.next(expenses);
      this.totalPages = Math.ceil(expenses.length / this.itemsPerPage);
      this.updatePaginatedExpenses(expenses);
    });
  }

  updatePaginatedExpenses(expenses: Expense[]) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedExpenses = expenses.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.filteredExpenses$.subscribe((expenses) =>
      this.updatePaginatedExpenses(expenses)
    );
  }

  onSearchChange() {
    this.expenses$.subscribe((expenses) => {
      const filtered = expenses.filter(
        (expense) =>
          expense.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          expense.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          expense.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredExpenses$.next(filtered);
      this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
      this.changePage(1); // Reset to the first page when searching
    });
  }

  deleteExpense(id: string) {
    this.store.dispatch(ExpenseActions.deleteExpense({ id }));
  }

  viewExpense(expense: Expense) {
    this.dialog.open(ViewModalComponent, {
      width: '600px',
      data: expense,
    });
  }

  editExpense(expense: Expense) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '600px',
      data: { ...expense },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ExpenseActions.updateExpense({ expense: result }));
      }
    });
  }

  toggleExpenseActive(event: { id: string; isActive: boolean }) {
    this.store.dispatch(
      ExpenseActions.toggleExpenseActive({
        id: event.id,
        isActive: event.isActive,
      })
    );
  }

  updateMonthlySummary() {
    this.store.dispatch(
      ExpenseActions.updateMonthlyExpenses({ year: this.currentYear })
    );
  }
}
