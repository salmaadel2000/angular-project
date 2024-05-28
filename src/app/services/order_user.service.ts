import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ProfileService} from "./Profile.service"; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://127.0.0.1:8000/api/order';

  constructor(private http: HttpClient, private ProfileService: ProfileService) {}

  getOrdersByUserId(userId: number): Observable<Order[]> {
    const token = this.ProfileService.getTokenFromLocalStorage(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Order[]>(`${this.ordersUrl}/${userId}`, { headers });
  }

  deleteOrder(orderId: number): Observable<void> {
    const token = this.ProfileService.getTokenFromLocalStorage(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.ordersUrl}/${orderId}`,{headers});
  }
}

