import { Routes } from '@angular/router';
import { SignInPageComponent } from './pages/singin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';
import { SignUpConfirmationComponent } from './pages/signup-confirmation-page/signup-confirmation-page.component';
import { ChallengeCallbackPageComponent } from './pages/challenge-callback-page/challenge-callback-page.component';

export const routes: Routes = [
    { path: 'signin', component: SignInPageComponent },
    { path: 'signout', component: SignInPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'signup-external', component: SignUpPageComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'signup/confirmation', component: SignUpConfirmationComponent },
            { path: 'external-challenge-callback/:provider', component: ChallengeCallbackPageComponent },
        ]
    }
];