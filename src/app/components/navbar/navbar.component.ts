import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!this.authService.getToken();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }  
}
