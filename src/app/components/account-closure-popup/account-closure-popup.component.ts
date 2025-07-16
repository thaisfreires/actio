import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'; 

@Component({
  selector: 'app-account-closure-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-closure-popup.component.html',
  styleUrls: ['./account-closure-popup.component.scss'] 
})
export class AccountClosurePopupComponent implements OnInit {

  @Input() show = false;
  @Output() closureConfirmed = new EventEmitter<void>();

  closureCriteriaMet = false;
  pendingReasons: string[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.validateClosureCriteria();
  }

  validateClosureCriteria() {
    this.accountService.validateAccountClosure().subscribe(result => {
      this.closureCriteriaMet = result.allowed;
      this.pendingReasons = result.reasons;
    });
  }

  confirmClosure() {
    this.close();
    this.closureConfirmed.emit();
    this.pendingReasons = [];
  }

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
    this.pendingReasons = [];
  }
}
