import { Routes } from '@angular/router';
import { SignInPageComponent } from './pages/singin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';
import { SignUpConfirmationComponent } from './pages/signup-confirmation-page/signup-confirmation-page.component';
import { ChallengeCallbackPageComponent } from './pages/challenge-callback-page/challenge-callback-page.component';
import { SignUpExtendedPageComponent } from './pages/signup-extended-page/signup-extended-page.component';
import { SignUpExternalExtendedPageComponent } from './pages/signup-external-extended-page/signup-external-extended-page.component';

export const routes: Routes = [
    { path: 'signin', component: SignInPageComponent },
    { path: 'signout', component: SignInPageComponent },

    { path: 'signup', component: SignUpPageComponent },
    // Uncomment the following line to enable sign up with additional fields
    // { path: 'signup', component: SignUpExtendedPageComponent },

    { path: 'signup-external', component: SignUpPageComponent },
    // Uncomment the following line to enable external sign up with additional fields
    // { path: 'signup-external', component: SignUpExternalExtendedPageComponent },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'signup/confirmation', component: SignUpConfirmationComponent },
            { path: 'external-challenge-callback/:provider', component: ChallengeCallbackPageComponent },
        ]
    }
];