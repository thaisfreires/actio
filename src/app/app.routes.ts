import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './pages/homepage/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';

export const routes: Routes = [
    {path: 'login', pathMatch: 'full', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    {path: 'homepage', component: HomepageComponent}
];
