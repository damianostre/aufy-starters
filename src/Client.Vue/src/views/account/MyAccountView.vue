<template>
    <div>
        <div>
            <div>
                <h3>Profile Information</h3>
            </div>
            <div>
                <dl>
                    <div>
                        <dt>Email address</dt>
                        <dd>{{ user?.email }}</dd>
                    </div>

                    <div>
                        <dt>Logins</dt>
                        <dd>{{ user?.logins.join(', ') }}</dd>
                    </div>

                    <div>
                        <dt>Link logins</dt>
                        <dd>
                            <ExternalProviders :mode="'LinkLogin'" :hide="user?.logins" />
                        </dd>
                    </div>

                    <div v-if="user?.hasPassword">
                        <dt>Change password</dt>
                        <dd>
                            <ChangePasswordForm />
                        </dd>
                    </div>

                    <div>
                        <dt>Roles</dt>
                        <dd>{{ user?.roles.join(', ') }}</dd>
                    </div>
                </dl>
            </div>
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