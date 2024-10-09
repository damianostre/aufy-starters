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

        <div v-if="notification" class="rounded-md bg-green-50 p-4">
            <div class="flex">
                <div class="ml-3">
                    <div class="mt-2 text-sm text-green-700">
                        <ul role="list" class="list-disc space-y-1 pl-5">
                            <li>{{ notification }}</li>
                        </ul>
                    </div>
                </div>
            </div>
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
            <label for="newPassword" class="block text-sm font-medium leading-6 text-gray-900">
                New Password
            </label>
            <div class="mt-2">
                <input
                    v-model="form.newPassword"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
                v-if="formErrors?.newPassword?._errors">{{ formErrors?.newPassword?._errors[0] }}</p>
        </div>

        <div>
            <label for="confirmNewPassword" class="block text-sm font-medium leading-6 text-gray-900">
                Confirm New Password
            </label>
            <div class="mt-2">
                <input
                    v-model="form.confirmNewPassword"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
            <p class="mt-2 text-sm text-red-600"
                v-if="formErrors?.confirmNewPassword?._errors">{{ formErrors?.confirmNewPassword?._errors[0] }}</p>
        </div>

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md hover:primary-bg primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :disabled="isSubmitting"
            >
                {{ isSubmitting ? "Processing..." : "Change" }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { useAuth } from '@/stores/AuthStore';

const apiErrors = ref<string[] | null>(null);
const notification = ref<string | undefined>(undefined);
const isSubmitting = ref(false);
const form = ref({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
});

const formSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmNewPassword: z.string().min(1, { message: "Confirm Password is required" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords don't match"
});
type formSchemaType = z.infer<typeof formSchema>;
const formErrors = ref<z.ZodFormattedError<formSchemaType> | null>(null);

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
        await aufy.changePassword({ password: form.value.password, newPassword: form.value.newPassword });
        notification.value = "Password changed successfully";
        apiErrors.value = null;
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ["Error occurred"];
    } finally {
        isSubmitting.value = false;
    }
};
</script>