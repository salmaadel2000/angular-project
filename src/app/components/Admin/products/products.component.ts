import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule, RouterLink, RouterModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    filterTerm: string = '';
    sub: Subscription | null = null;

    constructor(private productService: ProductService, private router: Router) {}

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.sub = this.productService.getProducts().subscribe(
            (data: Product[]) => {
                this.products = data;
                this.filteredProducts = data; // Initialize filteredProducts
                console.log('Products loaded:', this.products);
            },
            (error) => {
                console.error('Error fetching products', error);
            }
        );
    }

    filterProducts(): void {
        if (this.filterTerm) {
            this.filteredProducts = this.products.filter(product =>
                product.title.toLowerCase().includes(this.filterTerm.toLowerCase())
            );
        } else {
            this.filteredProducts = this.products;
        }
    }

    addProduct(): void {
        this.router.navigate(['/add-product']);
    }

    viewProduct(id: number): void {
        this.router.navigate(['/admin/view-product', id]);
    }

    editProduct(id: number): void {
        this.router.navigate(['/admin/edit-product', id]);
    }
    
    deleteProduct(id: number): void {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe(
                () => {
                    this.products = this.products.filter(product => product.id !== id);
                    this.filterProducts(); // Update the filtered list after deletion
                    console.log(`Product with id ${id} deleted successfully`);
                },
                (error) => {
                    console.error('Error deleting product', error);
                }
            );
        }
    }
}
