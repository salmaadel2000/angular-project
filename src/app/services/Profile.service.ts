import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/Register.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/user-profile'; 
  private api = 'http://127.0.0.1:8000/api/auth/profile/update'; 
  constructor(private http: HttpClient) {}

  getUserData(token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  updateUser(userId: number, formData: FormData): Observable<User> {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<User>(`${this.api}/${userId}`, formData, { headers }).pipe(

      catchError((error: any) => { 
        return throwError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('ProfileService error:', error);
    throw error;
  }

 getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }
   removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token');
  }
  
}
