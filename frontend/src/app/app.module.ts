import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Import Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';

import { ViewModalComponent } from './view-modal/view-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseEffects } from './store/effects/expense.effects';
import { expenseReducer } from './store/reducers/expense.reducer';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FilterByYearPipe } from './filterByYear.pipe';
import { SortByMonthPipe } from './sort-by-month.pipe';



@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent,
    ViewModalComponent,
    FilterByYearPipe,
    SortByMonthPipe
    // Declare other components here
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    BrowserModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconButton,
    MatSlideToggleModule,
    MatIconModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatNativeDateModule,
    MatButtonModule,
    StoreModule.forRoot({ expenses: expenseReducer }),
    EffectsModule.forRoot([ExpenseEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
