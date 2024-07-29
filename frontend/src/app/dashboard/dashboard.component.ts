import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ExpenseActions from '../store/actions/expense.actions';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
    } else {
      this.store.dispatch(ExpenseActions.loadExpenses());
      const currentYear = new Date().getFullYear();
      this.store.dispatch(
        ExpenseActions.updateMonthlyExpenses({ year: currentYear })
      );

      // Fetch the logged-in user's details
      this.userService.getUser().subscribe(
        (user) => {
          console.log(user);
          this.username = user.name; // Extract the name from the user object
        },
        (error) => {
          console.error('Error fetching user data', error);
          // Handle errors appropriately, e.g., redirect to login if needed
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
