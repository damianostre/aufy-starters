import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { FeaturesPageComponent } from './home/pages/features-page/features-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { routes as authRoutes } from './auth/auth.routes';
import { accountRoutes } from './account/account.routes';

export const routes: Routes = [
  {    
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'features', component: FeaturesPageComponent },
    ],
  },
  ...authRoutes,
  ...accountRoutes,
];

