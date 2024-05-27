// add-product.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      details: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {}

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.addProductForm.patchValue({
      image: file
    });
    this.addProductForm.get('image')!.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addProductForm.get('title')!.value);
      formData.append('image', this.addProductForm.get('image')!.value);
      formData.append('price', this.addProductForm.get('price')!.value.toString());
      formData.append('details', this.addProductForm.get('details')!.value);

      this.productService.addProduct(formData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
