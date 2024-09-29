import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { FeaturesPageComponent } from './home/pages/features-page/features-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { routes as authRoutes } from './auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'features', component: FeaturesPageComponent },
    ],
  },
];

// export const routes: Routes = [
//   { path: 'signin', component: SignInComponent },
//   { path: 'signout', component: SignOutComponent },
//   { path: 'signup', component: SignUpComponent },
//   { path: 'signup-external', component: SignUpExternalComponent },
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       { path: '', component: HomePageComponent },
//       { path: 'profile', component: MyAccountComponent, canActivate: [AuthGuard] },
//       { path: 'features', component: FeaturesComponent },
//       { path: 'signup/confirmation', component: SignUpConfirmationComponent },
//       { path: 'resend-confirm-email', component: ResendEmailConfirmationComponent },
//       { path: 'external-challenge-callback/:provider', component: ChallengeCallbackComponent },
//       { path: 'forgot-password', component: ForgotPasswordComponent },
//       { path: 'reset-password', component: ResetPasswordComponent },
//       { path: 'reset-password/confirmation', component: ResetPasswordConfirmationComponent },
//       { path: 'confirm-email', component: ConfirmEmailComponent },
//     ],
//   },
// ];
