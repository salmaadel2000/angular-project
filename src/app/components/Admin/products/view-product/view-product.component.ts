import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-view-product',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './view-product.component.html',
    styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.productService.getProductById(+productId).subscribe(
                (data: Product) => {
                    this.product = data;
                },
                (error) => {
                    console.error('Error fetching product', error);
                }
            );
        }
    }

    goBack(): void {
        this.router.navigate(['/admin/products']);
    }
}
