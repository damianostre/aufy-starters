import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal(null);

  isAuthenticated = computed(() => !!this.user());
}
