import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FeaturesView from '@/views/FeaturesView.vue';
import SignInView from '@/views/auth/SignInView.vue';
import SignOutView from '@/views/auth/SignOutView.vue';
import SignUpView from '@/views/auth/SignUpView.vue';
import MyAccountView from '@/views/account/MyAccountView.vue';
import SignUpConfirmationView from '@/views/auth/SignUpConfirmationView.vue';
import ResendEmailConfirmationView from '@/views/account/ResendEmailConfirmationView.vue';
import ChallengeCallbackView from '@/views/auth/ChallengeCallbackView.vue';
import ForgotPasswordView from '@/views/account/ForgotPasswordView.vue';
import ResetPasswordView from '@/views/account/ResetPasswordView.vue';
import ResetPasswordConfirmationView from '@/views/account/ResetPasswordConfirmationView.vue';
import ConfirmEmailView from '@/views/account/ConfirmEmailView.vue';
import SignUpExternalView from '@/views/auth/SignUpExternalView.vue';
import SignUpExtendedView from '@/views/auth/SignUpExtendedView.vue';
import SignUpExternalExtendedView from '@/views/auth/SignUpExternalExtendedView.vue';
import MainLayout from '@/views/MainLayout.vue';
import { useAuth } from '@/stores/AuthStore';

const routes = [
    { path: '/signin', component: SignInView, name: 'signin' },
    { path: '/signout', component: SignOutView, name: 'signout' },
    
    { path: '/signup', component: SignUpView, name: 'signup' },
    // Uncomment the following line to enable sign up with additional fields
    { path: '/signup', component: SignUpExtendedView },

    { path: '/signup-external', component: SignUpExternalView, name: 'signup-external' },
    // Uncomment the following line to enable external sign up with additional fields
    { path: '/signup-external', component: SignUpExternalExtendedView },

    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', component: HomeView, name: 'home' },
            { path: '/profile', component: MyAccountView, meta: { requiresAuth: true }, name: 'profile' },
            { path: '/features', component: FeaturesView, name: 'features' },
            { path: '/signup/confirmation', component: SignUpConfirmationView, name: 'signup-confirmation' },
            { path: '/resend-confirm-email', component: ResendEmailConfirmationView, name: 'resend-confirm-email' },
            { path: '/external-challenge-callback/:provider', component: ChallengeCallbackView, name: 'external-challenge-callback' },
            { path: '/forgot-password', component: ForgotPasswordView, name: 'forgot-password' },
            { path: '/reset-password', component: ResetPasswordView, name: 'reset-password' },
            { path: '/reset-password/confirmation', component: ResetPasswordConfirmationView, name: 'reset-password-confirmation' },
            { path: '/confirm-email', component: ConfirmEmailView, name: 'confirm-email' },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    const { user } = useAuth();

    if (to.meta.requiresAuth && !user) {
        return {
            path: '/signin',
            // save the location we were at to come back later
            // query: { redirect: to.fullPath },
        }
    }
})

export default router;
