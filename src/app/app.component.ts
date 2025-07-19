import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidebarOpen: boolean = false;
  showLayout = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public sidebarService: SidebarService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        this.showLayout = !(
          currentUrl.includes('/login') || currentUrl.includes('/register')
        );
      });

    this.sidebarService.sidebarOpen$.subscribe((open: boolean) => {
      this.sidebarOpen = open;
    });
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
