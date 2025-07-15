import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }

}
