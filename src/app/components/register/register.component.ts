import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, Auth } from '../../models/Register.model';
import { AuthService } from '../../services/Register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User('', '', '', '', 'male');
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm): void {
    if (registerForm.invalid || this.password !== this.confirmPassword) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('email', this.user.email);
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('password_confirmation', this.user.confirmPassword);
    formData.append('gender', this.user.gender);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authService.register(formData).subscribe(
      (response: Auth) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        console.log(response.token);
        if (response.user?.id) {
          console.log(response.user);
          localStorage.setItem('id', response.user.id.toString());
          this.router.navigateByUrl('/login');
        }
      },
      (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.errorMessage = null; 
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please select a valid image file.';
    }
  }
}
