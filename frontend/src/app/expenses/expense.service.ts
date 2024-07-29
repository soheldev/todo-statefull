import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5000/api/expenses';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`, {
      headers: this.getHeaders(),
    });
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, expense, {
      headers: this.getHeaders(),
    });
  }

  updateExpense(expense: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${expense._id}`, expense, {
      headers: this.getHeaders(),
    });
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  toggleExpenseActive(id: string, isActive: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/toggle-active/${id}`, { isActive }, {
      headers: this.getHeaders(),
    });
  }

  getMonthlyExpenseSummary(): Observable<{ month: string; total: number }[]> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/monthly-summary`, { headers: this.getHeaders() })
      .pipe(
        map(summary => 
          Object.keys(summary).map(month => ({
            month,
            total: summary[month]
          }))
        )
      );
  }
}
