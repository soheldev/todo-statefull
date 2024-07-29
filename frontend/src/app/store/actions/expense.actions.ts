import { createAction, props } from '@ngrx/store';

export const loadExpenses = createAction('[Expense] Load Expenses');
export const loadExpensesSuccess = createAction('[Expense] Load Expenses Success', props<{ expenses: any[] }>());
export const loadExpensesFailure = createAction('[Expense] Load Expenses Failure', props<{ error: any }>());

export const addExpense = createAction('[Expense] Add Expense', props<{ expense: any }>());
export const addExpenseSuccess = createAction('[Expense] Add Expense Success', props<{ expense: any }>());
export const addExpenseFailure = createAction('[Expense] Add Expense Failure', props<{ error: any }>());

export const deleteExpense = createAction('[Expense] Delete Expense', props<{ id: string }>());
export const deleteExpenseSuccess = createAction('[Expense] Delete Expense Success', props<{ id: string }>());
export const deleteExpenseFailure = createAction('[Expense] Delete Expense Failure', props<{ error: any }>());

export const updateExpense = createAction('[Expense] Update Expense', props<{ expense: any }>());
export const updateExpenseSuccess = createAction('[Expense] Update Expense Success', props<{ expense: any }>());
export const updateExpenseFailure = createAction('[Expense] Update Expense Failure', props<{ error: any }>());

export const toggleExpenseActive = createAction('[Expense] Toggle Expense Active', props<{ id: string; isActive: boolean }>());
export const toggleExpenseActiveSuccess = createAction('[Expense] Toggle Expense Active Success', props<{ id: string; isActive: boolean }>());
export const toggleExpenseActiveFailure = createAction('[Expense] Toggle Expense Active Failure', props<{ error: any }>());

export const updateMonthlyExpenses = createAction('[Expense] Update Monthly Expenses', props<{ year: number }>() );
export const updateMonthlyExpensesSuccess = createAction('[Expense] Update Monthly Expenses Success', props<{ monthlyExpenses: { month: string; total: number }[] }>());
export const updateMonthlyExpensesFailure = createAction('[Expense] Update Monthly Expenses Failure', props<{ error: any }>());
