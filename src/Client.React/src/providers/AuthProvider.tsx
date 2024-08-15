import React, { createContext, useContext, useMemo } from 'react';
import { AufyClient } from 'aufy-client/src/aufy-client.ts';
import { createAxiosInstance } from 'aufy-client/src/axios-utils.ts';
import { AuthUser } from 'aufy-client/src/types.ts';

export const axios = createAxiosInstance(import.meta.env.VITE_API_URL);
export const aufy = new AufyClient({
    apiBaseUrl: import.meta.env.VITE_API_URL,
    axiosInstance: axios,
});

const AuthContext = createContext<AuthContextProps>({ user: null } as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(aufy.getUser());

    aufy.initAxiosInterceptors(() => {
        setUser(null);
    });

    aufy.onEvents({
        onSignIn: (user) => {
            setUser(user);
        },
        onSignOut: () => {
            setUser(null);
        },
    });

    const value = useMemo<AuthContextProps>(
        () => ({
            user,
            aufy,
        }),
        [user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export interface AuthContextProps {
    user: AuthUser | null;
    aufy: AufyClient;
}

