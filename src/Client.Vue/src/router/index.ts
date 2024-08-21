import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FeaturesView from '@/views/FeaturesView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/features',
            name: 'features',
            component: FeaturesView,
        },
        {
            path: '/signin',
            name: 'signin',
            component: () => import('../views/auth/SignInView.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/auth/SignUpView.vue'),
        },
        {
            path: '/signup/confirmation',
            name: 'signup-confirmation',
            component: () => import('../views/auth/SignUpConfirmationView.vue'),
        },

    ],
});

export default router;
