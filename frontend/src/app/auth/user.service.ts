import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Ensure path is correct

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/auth/user';  // Your backend endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get the HTTP headers including authorization
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Retrieve the token from AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Method to get user details from the API
  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }
}
