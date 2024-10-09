<template>
    <form class="space-y-6" action="#" method="POST" @submit.prevent="onSubmit" novalidate>
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
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <input
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
               v-if="formErrors?.email?._errors">{{ formErrors?.email?._errors[0] }}</p>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
                <input
                    v-model="form.password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
               v-if="formErrors?.password?._errors">{{ formErrors?.password?._errors[0] }}</p>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center"></div>
            <div class="text-sm leading-6">
                <RouterLink to="/forgot-password"
                            class="font-semibold primary-color hover:primary-color">Forgot password?
                </RouterLink>
            </div>
        </div>

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:primary-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:primary-bg-darker"
                :disabled="isSubmitting"
            >
                {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
            </button>
        </div>

        <div class="flex items-center justify-between">
            <div class="text-sm leading-6">
                Not a member?
                <RouterLink to="/signup"
                            class="ml-3 font-semibold primary-color hover:primary-color">Sign up now
                </RouterLink>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { useAuth } from '@/stores/AuthStore';
import { z } from 'zod';
import router from '@/router';

const isSubmitting = ref(false);
const form = ref({ email: '', password: '' });
const formSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
});
type formSchemaType = z.infer<typeof formSchema>;
const formErrors = ref<z.ZodFormattedError<formSchemaType> | null>(null);
const apiErrors = ref<string[] | undefined>(undefined);

const onSubmit = async (event: Event) => {
    event.preventDefault();
    isSubmitting.value = true;

    const validSchema = formSchema.safeParse(form.value);
    if (!validSchema.success) {
        formErrors.value = validSchema.error.format();
        isSubmitting.value = false;
        return;
    } else {
        formErrors.value = null;
    }

    const { aufy } = useAuth();
    try {
        await aufy.signIn({ email: form.value.email, password: form.value.password });
        await router.push("/");
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ['Error occurred'];
    } finally {
        isSubmitting.value = false;
    }
};
</script>
