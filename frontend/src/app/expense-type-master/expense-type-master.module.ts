import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseTypeMasterRoutingModule } from './expense-type-master-routing.module';
import { ExpenseTypeMasterComponent } from './expense-type-master.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExpenseTypeMasterComponent,
    AddTypeComponent,
  ],
  imports: [
    CommonModule,
    ExpenseTypeMasterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ExpenseTypeMasterModule { }
