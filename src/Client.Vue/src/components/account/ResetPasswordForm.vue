<template>
    <form @submit.prevent="handleSubmit" class="space-y-5" method="POST" novalidate>
        <div v-if="apiErrors" class="rounded-md bg-red-50 p-4">
            <div class="flex">
                <div class="ml-3">
                    <div class="mt-2 text-sm text-red-700">
                        <ul role="list" class="list-disc space-y-1 pl-5">
                            <li v-for="(error, index) in apiErrors" :key="index">{{ error }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                Email address
            </label>
            <div class="mt-2">
                <input
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
               v-if="formErrors?.email?._errors">{{ formErrors?.email?._errors[0] }}</p>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                Password
            </label>
            <div class="mt-2">
                <input
                    v-model="form.password"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
               v-if="formErrors?.password?._errors">{{ formErrors?.password?._errors[0] }}</p>
        </div>

        <div>
            <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
            </label>
            <div class="mt-2">
                <input
                    v-model="form.confirmPassword"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
                v-if="formErrors?.confirmPassword?._errors">{{ formErrors?.confirmPassword?._errors[0] }}</p>
        </div>

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md hover:primary-bg primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :disabled="isSubmitting"
            >
                {{ isSubmitting ? 'Processing...' : 'Reset Password' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { z } from 'zod';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { useAuth } from '@/stores/AuthStore';

const apiErrors = ref<string[] | null>(null);
const form = ref({
    email: '',
    password: '',
    confirmPassword: '',
});

const isSubmitting = ref(false);
const router = useRouter();
const route = useRoute();
const { aufy } = useAuth();

const formSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords don\'t match',
});
type formSchemaType = z.infer<typeof formSchema>;
const formErrors = ref<z.ZodFormattedError<formSchemaType> | null>(null);

const handleSubmit = async () => {
    isSubmitting.value = true;
    const validSchema = formSchema.safeParse(form.value);
    if (!validSchema.success) {
        formErrors.value = validSchema.error.format();
        isSubmitting.value = false;
        return;
    } else {
        formErrors.value = null;
    }

    try {
        const code = route.query.code;
        if (!code) {
            apiErrors.value = ['Invalid reset code'];
        }

        await aufy.resetPassword({ email: form.value.email, password: form.value.password, code: code as string });
        await router.push('/reset-password/confirmation');
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ['Error occurred'];
    } finally {
        isSubmitting.value = false;
    }
};
</script>