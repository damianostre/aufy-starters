import { computed, Injectable, signal } from '@angular/core';
import { createAxiosInstance } from 'aufy-client/src/axios-utils';
import { AufyClient } from 'aufy-client/src/aufy-client';
import type { AuthUser } from 'aufy-client/src/types';
import type {AxiosInstance} from "axios";
import { environment as env } from '../../../environments/environment';

export const axios: AxiosInstance = createAxiosInstance(env.apiUrl);
export const aufy = new AufyClient({
    apiBaseUrl: env.apiUrl,
    axiosInstance: axios,
});
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private $user = signal<AuthUser | null>(null);

  public isAuthenticated = computed(() => !!this.$user());
  public user = computed(() => this.$user());

  public aufy() {
    return aufy;
  }

  constructor() {
    aufy.onEvents({
      onSignIn: (user) => {
          this.$user.set(user);
      },
      onSignOut: () => {
          this.$user.set(null);
      },
    });
  }
}
