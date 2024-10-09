<template>
    <div>
        <div class="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div class="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
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
                            <label for="aboutMe" class="block text-sm font-medium leading-6 text-gray-900">
                                About me
                            </label>
                            <div class="mt-2">
                                <input v-model="form.aboutMe" type="text"
                                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                            </div>
                            <p class="mt-2 text-sm text-red-600"
                               v-if="formErrors?.aboutMe?._errors">{{ formErrors.aboutMe?._errors[0] }}></p>

                        </div>

                        <div>
                            <label for="mySiteUrl" class="block text-sm font-medium leading-6 text-gray-900">
                                My Site URL
                            </label>
                            <div class="mt-2">
                                <input v-model="form.mySiteUrl" type="text"
                                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
                            </div>
                            <p class="mt-2 text-sm text-red-600"
                                 v-if="formErrors?.mySiteUrl?._errors">{{ formErrors.mySiteUrl?._errors[0] }}></p>
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
                                <RouterLink to="/signin" class="ml-3 font-semibold primary-color hover:primary-color">
                                    Sign in
                                </RouterLink>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <RouterLink to="/" class="text-sm font-medium leading-6 text-gray-600 hover:text-gray-900">
                        <svg class="w-4 h-4 inline-block" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
                            <path fill="#000000"
                                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
                        </svg>
                        Home
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
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
    aboutMe: '',
    mySiteUrl: '',
});

const formSchema = z.object({
    aboutMe: z.string().max(100, { message: 'About me must be at most 100 characters' }),
    mySiteUrl: z.string().url({ message: 'Must be a valid URL' }),
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
        await aufy.signUpExternal({
            aboutMe: form.value.aboutMe,
            mySiteUrl: form.value.mySiteUrl,
        });
        await router.push('/profile');
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ['Error occurred'];
    } finally {
        isSubmitting.value = false;
    }
};
</script>