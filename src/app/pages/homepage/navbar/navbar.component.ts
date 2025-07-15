import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-navbar',
  imports: [SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  
  }
}
