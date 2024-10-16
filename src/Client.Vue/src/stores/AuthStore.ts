import { reactive } from 'vue';
import { createAxiosInstance } from 'aufy-client/src/axios-utils';
import { AufyClient } from 'aufy-client/src/aufy-client';
import type { AuthUser } from 'aufy-client/src/types';
import type {AxiosInstance} from "axios";

export const axios: AxiosInstance = createAxiosInstance(import.meta.env.VITE_API_URL);
export const aufy = new AufyClient({
    apiBaseUrl: import.meta.env.VITE_API_URL,
    axiosInstance: axios,
});

const authStore = reactive<{
    user: AuthUser | null,
    aufy: AufyClient,
}>({
    user: aufy.getUser(),
    aufy,
});

aufy.initAxiosInterceptors(() => {
    authStore.user = null;
});

aufy.onEvents({
    onSignIn: (user) => {
        authStore.user = user;
    },
    onSignOut: () => {
        authStore.user = null;
    },
});

export const useAuth = () => {
    return authStore;
};

