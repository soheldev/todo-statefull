// src/app/services/type-master.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface Type {
  _id: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class TypeMasterService {
  private apiUrl = 'http://localhost:5000/api/type-master';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/get`, {
      headers: this.getHeaders(),
    });
  }

  addType(type: string): Observable<Type> {
    return this.http.post<Type>(
      `${this.apiUrl}/add`,
      { type },
      { headers: this.getHeaders() }
    );
  }

  updateType(id: string, updatedType: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, updatedType)
      .pipe(
        tap(response => console.log('Update response:', response)),
        catchError(error => {
          console.error('Error in updateType:', error);
          return throwError(error);
        })
      );
  }

  deleteType(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
