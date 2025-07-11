import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfileService, UserProfile } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserProfile | null = null;
  userId = 1;

  constructor(private userProfileService: UserProfileService, private router: Router) {}

  ngOnInit(): void {
    this.userProfileService.getProfile(this.userId).subscribe({
      next: data => this.profileData = data,
      error: err => console.error('Failed to load profile:', err)
    });
  }

  goToEdit(): void {
    this.router.navigate(['/profile/edit']);
  }
}