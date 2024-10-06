import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalProvidersComponent } from '../../../auth/components/external-providers/external-providers.component';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountInfoResponse } from 'aufy-client/src/types';

@Component({
  selector: 'my-account-page',
  standalone: true,
  imports: [CommonModule, ChangePasswordFormComponent, ExternalProvidersComponent],
  templateUrl: './my-account-page.component.html'
})
export class MyAccountPageComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  user = signal<AccountInfoResponse | undefined>(undefined);
  logins = computed(() => this.user()?.logins.join(', ') ?? '');
  roles = computed(() => this.user()?.roles.join(', ') ?? '');

  constructor() {
    this.authService.aufy().accountInfo().then(res => this.user.set(res));

    const { link, failed } = this.route.snapshot.queryParams;

    if (link) {
      if (failed) {
        alert("Failed to link account");
      } else {
        this.authService.aufy().linkLogin()
          .then(res => this.user.set(res))
          .catch(() => alert("Failed to link account"));
      }
    }
  }
}