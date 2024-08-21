<template>
    <div>
        <h1>Don't get the email?</h1>
        <div class="mt-4 max-w-md">
            <form @submit.prevent="handleSubmit" class="space-y-5" method="POST" novalidate>
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
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md hover:primary-bg primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        :disabled="isSubmitting || isSubmitSuccessful"
                    >
                        {{ isSubmitting ? "Sending..." : isSubmitSuccessful ? "Email Sent" : "Resend Confirmation Email" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { useAuth } from '@/stores/AuthStore';

const apiErrors = ref<string[] | null>(null);
const notification = ref<string | undefined>(undefined);
const isSubmitting = ref(false);
const isSubmitSuccessful = ref(false);
const form = ref({
    email: ''
});

const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Must be a valid email" })
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
        await aufy.resendEmailConfirmation(form.value.email);
        apiErrors.value = null;
        notification.value = "Email sent successfully";
        isSubmitSuccessful.value = true;
        form.value.email = '';
    } catch (error) {
        apiErrors.value = extractApiErrors(error) ?? ["Error occurred"];
    } finally {
        isSubmitting.value = false;
    }
};
</script>