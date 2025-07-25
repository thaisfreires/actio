import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserRole } from '../../models/enums/UserRole.enum';
import { CommonModule } from '@angular/common';
import { AccountClosurePopupComponent } from "../../components/account-closure-popup/account-closure-popup.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AccountClosurePopupComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  ngOnInit(): void {
    // Mock de dados do utilizador (simulação)
    this.user = {
      id_user: '1',
      name: 'Maria Silva',
      nif: '123456789',
      date_of_birth: new Date('1990-03-15'),
      email: 'maria.silva@email.com',
      password: '', // Não mostrar a password
      role: UserRole.User
    };
  }

  showPopup = false;

  openPopup(): void {
    this.showPopup = true;
  }

  onPopupClosed(): void {
    this.showPopup = false; // fecha o popup ao receber evento do filho
  }

  successMessage = '';
  accountClosed = false;

  close(): void {
    this.showPopup = false;
  }
  

  onClosureConfirmed(): void {
    this.successMessage = 'Account successfully closed!';
    this.accountClosed = true;
    this.close();
  
    setTimeout(() => {
      this.successMessage = '';
    }, 7000);
  }
}

