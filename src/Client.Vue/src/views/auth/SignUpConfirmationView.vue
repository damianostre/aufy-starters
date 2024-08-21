<template>
    <div>
        <h1>Congratulations! You have successfully signed up!</h1>
        <p v-if="requiresEmailConfirmation">
            Please check your email for confirmation link and Sign In.
        </p>
        <p v-if="requiresEmailConfirmation">
            Don't get the email?
            <strong><RouterLink to="/resend-confirm-email"> Resend confirmation email</RouterLink></strong>
        </p>
        <p><strong><RouterLink to="/signin">Sign In</RouterLink></strong></p>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const requiresEmailConfirmation = ref(route.query.requiresEmailConfirmation === 'true');
</script>