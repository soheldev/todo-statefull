import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTypeMasterComponent } from './expense-type-master.component';
import { AddTypeComponent } from './add-type/add-type.component';

const routes: Routes = [{ path: '', component: ExpenseTypeMasterComponent }, {path: 'add-type', component: AddTypeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseTypeMasterRoutingModule { }
