import { Component, OnInit,Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order_user.service';
import { Order } from '../../models/order.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId!: number;
  orders: Order[] = [];
  errorMessage: string | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.fetchOrders();
    } else {
      this.errorMessage = 'User ID is missing';
    }
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Error fetching orders:', error);
        this.errorMessage = 'An error occurred while fetching orders.';
      }
    );
  }

  deleteOrder(orderId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this.orders = this.orders.filter(order => order.id !== orderId);
            Swal.fire('Deleted!', 'The order has been deleted.', 'success');
          },
          error => {
            console.error('Error deleting order:', error);
            this.errorMessage = 'An error occurred while deleting the order.';
          }
        );
      }
    });
  }
  
}
