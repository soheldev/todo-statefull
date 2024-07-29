import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

const routes: Routes = [{ path: '', component: ExpensesComponent }, {path: 'add-expense', component: AddExpenseComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
