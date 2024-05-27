import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id: number;
    user_id: number;
    username: string;
    date: string;
    img: string;
    total_price: number;
    status: 'pending' | 'accepted' | 'rejected';
    products: {
        id: number;
        title: string;
        price: number;
        quantity: number;
    }[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8000/orders';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }

    getOrdersByUserId(userId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}?user_id=${userId}`);
    }

    updateOrderStatus(id: number, status: 'accepted' | 'rejected'): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, { status });
    }

    deleteOrder(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
