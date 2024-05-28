import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/Profile.service';
import { User } from '../../models/Register.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-editprofile',
  standalone: true,
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user: User = new User('', '', '', '', 'male');
  errorMessage: string | null = null;
  token: string | null = null;
  selectedFile: File | null = null;
  file:any;
  fileData:any
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.profileService.getTokenFromLocalStorage();
    console.log(this.token);
    if (this.token) {
      this.fetchUserData(this.token);
    }
  }

  fetchUserData(token: string): void {
    this.profileService.getUserData(token).subscribe(
      (userData) => {
        console.log(userData)
        this.user = userData;
        this.fileData=userData.image
      },
      (error ) => { 
        console.error('Error fetching user data:', error);
      }
    );
  }

  submit(EditForm: NgForm): void {
    if (EditForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
      
    }
    
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('gender', this.user.gender);
    formData.append('_method','PUT');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);
    if (this.user.id !== null && this.user.id !== undefined) {
      this.profileService.updateUser(this.user.id, formData).subscribe(
        (response) => {
          console.log(response)
          console.log('User updated successfully');
          this.router.navigate(['/profile', this.user.id]);
        },
        (error: any) => { 
          console.error('Error updating user:', error);
          this.errorMessage = 'An error occurred while updating user data.';
        }
      );
    } else {
      console.error('User ID is null or undefined');
    }
  }
  
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    this.user.image=this.file.name
    if (this.file && this.file.type.startsWith('image/')) {
      this.selectedFile = this.file;
      this.errorMessage = null;
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please select a valid image file.';
    }
    console.log(this.file)
    this.ReadFile(this.file)
  }
  ReadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.fileData = reader.result;
    };
    reader.readAsDataURL(file);
  
}
}
