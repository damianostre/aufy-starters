<template>
    <div>
        <h1>Signing up...</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/AuthStore';

const router = useRouter();
const { aufy } = useAuth();

onMounted(() => {
    aufy.signUpExternal({})
        .then(() => {
            router.push('/profile');
        })
        .catch(() => {
            router.push('/signin?error=external-signin-failed');
        });
});
</script>