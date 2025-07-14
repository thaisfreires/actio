import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/register',
      pathMatch: 'full'
    },
    {
      path: 'login',
      pathMatch: 'full',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'unauthorized',
      component: UnauthorizedPageComponent
    }
];
