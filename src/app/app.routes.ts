import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { roleGuard } from './auth/role.guard';
import { ClientWalletComponent } from './pages/client-wallet/client-wallet.component';
import { AboutComponent } from './pages/about/about.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'login',
      pathMatch: 'full',
      component: LoginComponent
    },
    {
      path: 'about',
      pathMatch: 'full',
      component: AboutComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    //{
    //   path: 'homepage',
    //   component: HomeComponent
    // },

    {
      path: 'unauthorized',
      component: UnauthorizedPageComponent
    },
    {
      path: 'dashboard', 
      component: HomepageComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    },
    {
      path: 'wallet',
      component: ClientWalletComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    },
    {
      path: 'movements',
      component: MovementsComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    },
    {
      path: 'transactions',
      component: TransactionsComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    }

];
