import { createReducer, on } from '@ngrx/store';
import * as ExpenseActions from '../actions/expense.actions';

export interface ExpenseState {
  expenses: any[];
  loading: boolean;
  error: any;
  monthlyExpenses: { month: string; total: number }[];
}

export const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
  monthlyExpenses: []
};

export const expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.loadExpenses, state => ({ ...state, loading: true })),
  on(ExpenseActions.loadExpensesSuccess, (state, { expenses }) => ({ ...state, loading: false, expenses })),
  on(ExpenseActions.loadExpensesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ExpenseActions.addExpenseSuccess, (state, { expense }) => ({ ...state, expenses: [...state.expenses, expense] })),
  on(ExpenseActions.addExpenseFailure, (state, { error }) => ({ ...state, error })),

  on(ExpenseActions.deleteExpenseSuccess, (state, { id }) => ({
    ...state,
    expenses: state.expenses.filter(expense => expense._id !== id)
  })),
  on(ExpenseActions.deleteExpenseFailure, (state, { error }) => ({ ...state, error })),

  on(ExpenseActions.updateExpenseSuccess, (state, { expense }) => ({
    ...state,
    expenses: state.expenses.map(exp => exp._id === expense._id ? expense : exp)
  })),
  on(ExpenseActions.updateExpenseFailure, (state, { error }) => ({ ...state, error })),

  on(ExpenseActions.toggleExpenseActiveSuccess, (state, { id, isActive }) => ({
    ...state,
    expenses: state.expenses.map(exp => exp._id === id ? { ...exp, deleted: !isActive } : exp)
  })),
  on(ExpenseActions.toggleExpenseActiveFailure, (state, { error }) => ({ ...state, error })),

  on(ExpenseActions.updateMonthlyExpensesSuccess, (state, { monthlyExpenses }) => ({
    ...state,
    monthlyExpenses
  })),
  on(ExpenseActions.updateMonthlyExpensesFailure, (state, { error }) => ({ ...state, error }))
);
