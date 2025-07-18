import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private authService: AuthService){}

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }

  logout() {
    this.authService.logout();
  }
  

}
