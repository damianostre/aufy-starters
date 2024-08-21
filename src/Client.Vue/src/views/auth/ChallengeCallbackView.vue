<template>
    <h1>Authenticating...</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/stores/AuthStore';

const router = useRouter();
const route = useRoute();
const signup = route.query.signup;
const failed = route.query.failed;

const { aufy } = useAuth();

onMounted(() => {
    if (failed) {
        router.push('/signin');
    } else if (!signup) {
        aufy.signInExternal()
            .then(() => {
                router.push('/profile');
            })
            .catch(() => {
                router.push('/signin?error=external-signin-failed');
            });
    } else {
        router.push('/signup-external');
    }
});
</script>