import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfileService, UserProfile } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profileForm!: FormGroup;
  userId = 1;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      nif: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.userProfileService.getProfile(this.userId).subscribe(data => {
      this.profileForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userProfileService.updateProfile(this.userId, this.profileForm.value).subscribe(() => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile']);
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }
}

