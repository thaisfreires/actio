import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

export const routes: Routes = [
    {path: 'login', pathMatch: 'full', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'profile/edit', component: ProfileEditComponent },
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
];
