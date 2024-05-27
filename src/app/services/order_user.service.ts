import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:3001/order'; 

  constructor(private http: HttpClient) {}

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      map(orders => orders.filter(order => order.user_id === userId))
    );
  }

  deleteOrder(orderId: number): Observable<any> {
    const url = `${this.ordersUrl}/${orderId}`;
    return this.http.delete(url);
  }
}
