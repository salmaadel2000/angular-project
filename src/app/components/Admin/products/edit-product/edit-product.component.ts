// edit-product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: Product | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.editProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: [null],
      price: [0, [Validators.required, Validators.min(0)]],
      details: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.editProductForm.patchValue({
            title: data.title,
            price: data.price,
            details: data.details
          });
        },
        (error) => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.editProductForm.patchValue({
        image: this.imageFile
      });
      this.editProductForm.get('image')!.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.editProductForm.valid && this.product) {
      const formData = new FormData();
      formData.append('title', this.editProductForm.get('title')!.value);
      formData.append('price', this.editProductForm.get('price')!.value.toString());
      formData.append('details', this.editProductForm.get('details')!.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.productService.updateProduct(this.product.id, formData).subscribe(
        () => {
          this.router.navigate(['/admin/products']);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }
}
