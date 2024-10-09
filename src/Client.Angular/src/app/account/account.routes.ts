import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';
import { ResendEmailConfirmationPageComponent } from './pages/resend-email-confirmation-page/resend-email-confirmation-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ResetPasswordConfirmationPageComponent } from './pages/reset-password-confirmation-page/reset-password-confirmation-page.component';
import { ConfirmEmailPageComponent } from './pages/confirm-email-page/confirm-email-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const accountRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'profile', component: MyAccountPageComponent, canActivate: [AuthGuard] },
            { path: 'resend-confirm-email', component: ResendEmailConfirmationPageComponent },
            { path: 'forgot-password', component: ForgotPasswordPageComponent },
            { path: 'reset-password', component: ResetPasswordPageComponent },
            { path: 'reset-password/confirmation', component: ResetPasswordConfirmationPageComponent },
            { path: 'confirm-email', component: ConfirmEmailPageComponent },

        ]
    }
];
