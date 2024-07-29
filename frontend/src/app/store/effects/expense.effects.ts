import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ExpenseActions from '../actions/expense.actions';
import { ExpenseService } from '../../expenses/expense.service';

@Injectable()
export class ExpenseEffects {
  constructor(private actions$: Actions, private expenseService: ExpenseService) {}

  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      mergeMap(() => 
        this.expenseService.getExpenses().pipe(
          map(expenses => ExpenseActions.loadExpensesSuccess({ expenses })),
          catchError(error => of(ExpenseActions.loadExpensesFailure({ error })))
        )
      )
    )
  );

  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      mergeMap(action =>
        this.expenseService.addExpense(action.expense).pipe(
          map(expense => ExpenseActions.addExpenseSuccess({ expense })),
          catchError(error => of(ExpenseActions.addExpenseFailure({ error })))
        )
      )
    )
  );

  toggleExpenseActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.toggleExpenseActive),
      mergeMap(action =>
        this.expenseService.toggleExpenseActive(action.id, action.isActive).pipe(
          map(() => ExpenseActions.toggleExpenseActiveSuccess({ id: action.id, isActive: action.isActive })),
          catchError(error => of(ExpenseActions.toggleExpenseActiveFailure({ error })))
        )
      )
    )
  );

  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      mergeMap(action =>
        this.expenseService.updateExpense(action.expense).pipe(
          map(expense => ExpenseActions.updateExpenseSuccess({ expense })),
          catchError(error => of(ExpenseActions.updateExpenseFailure({ error })))
        )
      )
    )
  );

  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      mergeMap(action =>
        this.expenseService.deleteExpense(action.id).pipe(
          map(() => ExpenseActions.deleteExpenseSuccess({ id: action.id })),
          catchError(error => of(ExpenseActions.deleteExpenseFailure({ error })))
        )
      )
    )
  );

  updateMonthlyExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateMonthlyExpenses),
      mergeMap(action =>
        this.expenseService.getExpenses().pipe(
          map(expenses => {
            const monthlyExpenses = this.calculateMonthlyExpenses(expenses, action.year);
            return ExpenseActions.updateMonthlyExpensesSuccess({ monthlyExpenses });
          }),
          catchError(error => of(ExpenseActions.updateMonthlyExpensesFailure({ error })))
        )
      )
    )
  );

  private calculateMonthlyExpenses(expenses: any[], year: number): { month: string; total: number }[] {
    const monthlyExpenses: { [key: string]: number } = {};
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    monthOrder.forEach(month => {
      monthlyExpenses[month] = 0;
    });

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getFullYear() === year) {
        const monthName = monthOrder[expenseDate.getMonth()];
        monthlyExpenses[monthName] += expense.amount;
      }
    });

    return monthOrder.map(month => ({ month, total: monthlyExpenses[month] }));
  }
}