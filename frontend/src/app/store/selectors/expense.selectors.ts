import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from '../reducers/expense.reducer';

export const selectExpenseState = createFeatureSelector<ExpenseState>('expenses');

export const selectAllExpenses = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.expenses
);

export const selectMonthlyExpenses = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.monthlyExpenses
);
