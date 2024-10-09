<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">Profile Information</h3>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.email }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Logins</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.logins.join(', ') }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Link logins</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:max-w-[480px]">
            <ExternalProviders :mode="'LinkLogin'" :hide="user?.logins" />
          </dd>
        </div>

        <div v-if="user?.hasPassword" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Change password</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div class="mt-10 sm:w-full sm:max-w-[480px]">
              <ChangePasswordForm />
            </div>
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Roles</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ user?.roles.join(', ') }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ExternalProviders from '@/components/auth/ExternalProviders.vue';
import { useAuth } from '@/stores/AuthStore';
import type { AccountInfoResponse } from 'aufy-client/src/types';
import ChangePasswordForm from '@/components/account/ChangePasswordForm.vue';

const user = ref<AccountInfoResponse | null>(null);
const { aufy } = useAuth();
const route = useRoute();

onMounted(() => {
  aufy.accountInfo().then((res) => {
    user.value = res;
  });
});

const link = route.query.link;
const failed = route.query.failed;

onMounted(() => {
  if (!link) return;

  if (failed) {
    alert("Failed to link account");
  } else {
    aufy.linkLogin().then((res) => {
      user.value = res;
    }).catch(() => {
      alert("Failed to link account");
    });
  }
});
</script>