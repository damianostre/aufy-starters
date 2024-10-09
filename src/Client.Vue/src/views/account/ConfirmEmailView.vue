<template>
    <div>
        <h1 v-if="!valid">Invalid request</h1>
        <h1 v-else-if="loading">Confirming email...</h1>
        <div v-else>
            <h1 v-if="!success">Something went wrong</h1>
            <p v-if="!success">Please try again later.</p>
            <div v-else>
                <h1>Email confirmed!</h1>
                <p><strong><RouterLink to="/signin">Sign In</RouterLink></strong></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '@/stores/AuthStore';

const route = useRoute();
const { aufy } = useAuth();

const code = route.query.code as string | null;
const userId = route.query.userId as string | null;
const valid = !!code && !!userId;

const loading = ref(false);
const success = ref(false);

onMounted(() => {
    if (!valid) {
        return;
    }

    loading.value = true;
    aufy.confirmEmail(code, userId)
        .then(() => {
            loading.value = false;
            success.value = true;
        })
        .catch(() => {
            loading.value = false;
            success.value = false;
        });
});
</script>