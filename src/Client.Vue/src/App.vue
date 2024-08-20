<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuth } from '@/stores/AuthStore';
import { computed } from 'vue';

const { user } = useAuth();
const navigation = [
    { name: 'Features', href: '/features', current: false },
    { name: 'Docs', href: 'https://aufy.dev/manual/introduction/', current: false },
];

const userNavigation = computed(() => {
    return user ? [
        { name: 'My Account', href: '/profile', requireAuth: true },
        { name: 'Sign out', href: '/signout', requireAuth: true },
    ] : [
        { name: 'Sign in', href: '/signin', requireAuth: false },
    ];
});

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}
</script>

<template>
    <div class="min-h-full">
        <nav class="border-b border-gray-200 bg-white">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex">
                        <RouterLink to="/" class="flex flex-shrink-0 items-center">
                            <h1 class="font-bold primary-color hover:primary-color">Aufy 💚 Vue</h1>
                        </RouterLink>
                        <div class="-my-px ml-6 flex space-x-8">
                            <component
                                :is="item.href.startsWith('http') ? 'a' : 'router-link'"
                                v-for="item in navigation"
                                :key="item.name"
                                :to="item.href"
                                :href="item.href"
                                :class="classNames(item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium')"
                            >
                                {{ item.name }}
                            </component>
                        </div>
                    </div>
                    <div class="ml-6 flex items-center">
                        <RouterLink
                            v-for="item in userNavigation"
                            :key="item.name"
                            :to="item.href"
                            class="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                        >
                            {{ item.name }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </nav>

        <div class="py-10">
            <main>
                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>


