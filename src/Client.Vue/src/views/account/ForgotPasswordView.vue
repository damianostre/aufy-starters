<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot password?
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div class="mt-2">
                            <input
                                v-model="form.email"
                                type="email"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p class="mt-2 text-sm text-red-600"
                            v-if="formErrors?.email?._errors">{{ formErrors?.email?._errors[0] }}</p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md primary-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:primary-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:primary-bg-darker"
                        >
                            Send password reset email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { useAuth } from '@/stores/AuthStore';

const form = ref({
    email: ''
});

const formSchema = z.object({
    email: z
        .string().min(1, { message: "Email is required" })
        .email({ message: "Must be a valid email" })
});

type formSchemaType = z.infer<typeof formSchema>;
const formErrors = ref<z.ZodFormattedError<formSchemaType> | null>(null);

const { aufy } = useAuth();

const handleSubmit = async () => {
    const validSchema = formSchema.safeParse(form.value);
    if (!validSchema.success) {
        formErrors.value = validSchema.error.format();
        return;
    } else {
        formErrors.value = null;
    }

    try {
        await aufy.forgotPassword(form.value.email);
        alert("Password reset email sent");
    } catch (error) {
        console.error("Error sending password reset email", error);
    }
};
</script>