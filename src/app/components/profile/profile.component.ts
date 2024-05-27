import { Component, OnInit,NgModule  } from '@angular/core';
import { ProfileService } from '../../services/Profile.service';
import { User } from '../../models/Register.model';
import { Loginservice } from '../../services/Login.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[CommonModule,RouterModule],
  standalone:true
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private Loginservice:Loginservice
  ) {}

  ngOnInit(): void {
    
      this.token = this.Loginservice.getTokenFromLocalStorage()
      console.log(this.token)
      if (this.token) {
        this.fetchUserData(this.token);
      }
  }

  fetchUserData(token: string): void {
    this.profileService.getUserData(token).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}