import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MonthlyExpenseSummaryComponent } from '../monthly-expense-summary/monthly-expense-summary.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MonthlyExpenseSummaryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    
  ]
})
export class DashboardModule { }
