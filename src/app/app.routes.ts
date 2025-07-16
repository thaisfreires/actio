import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { roleGuard } from './auth/role.guard';
import { StockSearchComponent } from './components/stock-search/stock-search.component';
import { ClientWalletComponent } from './pages/client-wallet/client-wallet.component';

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
      path: 'homepage',
      component: HomepageComponent
    },
    {
      path: 'unauthorized',
      component: UnauthorizedPageComponent
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT', 'ADMIN'] }
    },
    {

      path: 'stock-test',
      loadComponent: () => import('./components/stock-search/stock-search.component').then(m => m.StockSearchComponent)
    },
    {
      path: 'wallet',
      component: ClientWalletComponent,
      canActivate: [roleGuard],
      data: { roles: ['CLIENT'] }
    }
];
