<template>
    <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/AuthStore';

const router = useRouter();
const { aufy } = useAuth();

aufy.signOut().then(() => {
    // Do nothing
}).catch(() => {
    // Do nothing
});

router.push('/');
</script>