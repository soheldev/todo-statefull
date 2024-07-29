// monthly-expense-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExpenseState } from '../store/reducers/expense.reducer';
import { selectMonthlyExpenses } from '../store/selectors/expense.selectors';
import * as ExpenseActions from '../store/actions/expense.actions';

interface MonthlyExpense {
  month: string;
  total: number;
}

@Component({
  selector: 'app-monthly-expense-summary',
  templateUrl: './monthly-expense-summary.component.html',
  styleUrls: ['./monthly-expense-summary.component.css']
})
export class MonthlyExpenseSummaryComponent implements OnInit {
  monthlyExpenses$: Observable<MonthlyExpense[]>;
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private store: Store<ExpenseState>) {
    this.monthlyExpenses$ = this.store.select(selectMonthlyExpenses);
  }

  ngOnInit(): void {
    this.initializeYears();
    this.updateMonthlyExpenses();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  }

  onYearChange(event: Event): void {
    this.selectedYear = parseInt((event.target as HTMLSelectElement).value, 10);
    this.updateMonthlyExpenses();
  }

  updateMonthlyExpenses(): void {
    this.store.dispatch(ExpenseActions.updateMonthlyExpenses({ year: this.selectedYear }));
  }
}
