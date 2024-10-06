import { computed, inject, Injectable, InjectOptions, signal, Type } from '@angular/core';
import { createAxiosInstance } from 'aufy-client/src/axios-utils';
import { AufyClient } from 'aufy-client/src/aufy-client';
import type { AuthUser } from 'aufy-client/src/types';
import type {AxiosInstance} from "axios";
import { environment as env } from '../../../environments/environment';
import { RootInjectorGuard } from '../../shared/root-injector-guard';

export const axios: AxiosInstance = createAxiosInstance(env.apiUrl);
export const aufy = new AufyClient({
    apiBaseUrl: env.apiUrl,
    axiosInstance: axios,
});

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RootInjectorGuard {
  private userSig = signal<AuthUser | null>(aufy.getUser());

  public isAuthenticated = computed(() => !!this.user());
  public user = computed(() => this.userSig());
  public user2: AuthUser | null = null;

  public aufy() {
    return aufy;
  }

  constructor() {
    super(AuthService);

    aufy.initAxiosInterceptors(() => {
      this.userSig.set(null);
    });

    aufy.onEvents({
      onSignIn: (user) => {
        debugger;
          this.userSig.set(user);
          this.user2 = user;
      },
      onSignOut: () => {
        debugger;
          this.userSig.set(null);
          this.user2 = null;
      },
    });
  }
}
