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
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <input v-model="form.email" type="email" autocomplete="email"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-2 text-sm text-red-600" id="email-error"
               v-if="formErrors?.email?._errors">{{ formErrors?.email?._errors[0] }}</p>
        </div>

        <div>
            <label for="aboutMe" class="block text-sm font-medium leading-6 text-gray-900">About me</label>
            <div class="mt-2">
                <input v-model="form.aboutMe" type="text"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-2 text-sm text-red-600" id="aboutMe-error"
               v-if="formErrors?.aboutMe?._errors">{{ formErrors?.aboutMe?._errors[0] }}</p>
        </div>

        <div>
            <label for="mySiteUrl" class="block text-sm font-medium leading-6 text-gray-900">My Site URL</label>
            <div class="mt-2">
                <input v-model="form.mySiteUrl" type="text" autocomplete="email"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-2 text-sm text-red-600" id="mySiteUrl-error"
               v-if="formErrors?.mySiteUrl?._errors">{{ formErrors?.mySiteUrl?._errors[0] }}</p>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
                <input v-model="form.password" type="password" required
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-2 text-sm text-red-600" id="password-error"
               v-if="formErrors?.password?._errors">{{ formErrors?.password?._errors[0] }}</p>
        </div>

        <div>
            <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm
                Password</label>
            <div class="mt-2">
                <input v-model="form.confirmPassword" type="password" required
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-2 text-sm text-red-600" id="confirmPassword-error"
                v-if="formErrors?.confirmPassword?._errors">{{ formErrors?.confirmPassword?._errors[0] }}</p>
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-md hover:primary-bg primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :disabled="isSubmitting">
                {{ isSubmitting ? 'Signing up...' : 'Sign up' }}
            </button>
        </div>

        <div class="flex items-center justify-between">
            <div class="text-sm leading-6">
                Already have an account?
                <RouterLink to="/signin" class="ml-3 font-semibold primary-color hover:primary-color">Sign in
                </RouterLink>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { useAuth } from '@/stores/AuthStore';

const apiErrors = ref<string[] | undefined>(undefined);
const isSubmitting = ref(false);
const form = ref({
    email: '',
    aboutMe: '',
    mySiteUrl: '',
    password: '',
    confirmPassword: '',
});

const formSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    aboutMe: z.string().max(100, { message: 'About me must be at most 100 characters' }),
    mySiteUrl: z.string().url({ message: 'Must be a valid URL' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
}).refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords don\'t match',
});
type formSchemaType = z.infer<typeof formSchema>;
const formErrors = ref<z.ZodFormattedError<formSchemaType> | null>(null);

const router = useRouter();
const { aufy } = useAuth();

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
        const res = await aufy.signUp({
            email: form.value.email,
            password: form.value.password,
            aboutMe: form.value.aboutMe,
            mySiteUrl: form.value.mySiteUrl,
        });
        await router.push({
            name: 'SignUpConfirmation',
            query: { requiresEmailConfirmation: res.requiresEmailConfirmation ? 'true' : 'false' }
        });
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ['Error occurred'];
    } finally {
        isSubmitting.value = false;
    }
};
</script>