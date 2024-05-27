import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth } from '../models/Register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/register'; 

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<Auth> {
    return this.http.post<Auth>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('AuthService error:', error);
    throw error;
  }
}
