import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../services/order.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    filterTerm: 'pending' | 'accepted' | 'rejected' | 'all' = 'all';
    userId: number = 1; // Example userId, you should set it appropriately

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.orderService.getOrders().subscribe(
            (data: Order[]) => {
                this.orders = data;
                console.log('Orders loaded:', this.orders);
            },
            (error: any) => {
                console.error('Error fetching orders', error);
            }
        );
    }

    loadOrdersByUserId(): void {
        this.orderService.getOrdersByUserId(this.userId).subscribe(
            (data: Order[]) => {
                this.orders = data;
                console.log(`Orders for user ${this.userId} loaded:`, this.orders);
            },
            (error: any) => {
                console.error(`Error fetching orders for user ${this.userId}`, error);
            }
        );
    }

    filterOrders(): Order[] {
        if (this.filterTerm === 'all') {
            return this.orders;
        }
        return this.orders.filter(order => order.status === this.filterTerm);
    }

    updateOrderStatus(id: number, status: 'accepted' | 'rejected'): void {
        console.log('Updating order status:', id, status);
        this.orderService.updateOrderStatus(id, status).subscribe(
            () => {
                console.log('Order status updated:', id, status);
                const order = this.orders.find(order => order.id === id);
                if (order) {
                    order.status = status;
                }
            },
            (error: any) => {
                console.error('Error updating order status', error);
            }
        );
    }

    getProductTitles(order: Order): string {
        return order.products ? order.products.map(p => p.title).join(', ') : '';
    }
}
