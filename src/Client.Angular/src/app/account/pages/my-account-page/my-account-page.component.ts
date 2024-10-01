import { Component, inject, signal, effect } from '@angular/core';
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
  templateUrl: './my-account.component.html'
})
export class MyAccountPageComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<AccountInfoResponse | undefined>(undefined);
  link = signal<string | null>(null);
  failed = signal<string | null>(null);

  constructor() {
    this.authService.aufy().accountInfo().then(res => this.user.set(res));

    const queryParams = this.route.snapshot.queryParamMap;
    this.link.set(queryParams.get('link'));
    this.failed.set(queryParams.get('failed'));

    effect(() => {
      if (!this.link()) return;

      if (this.failed()) {
        alert("Failed to link account");
      } else {
        this.authService.aufy().linkLogin().then(res => this.user.set(res))
          .catch(() => alert("Failed to link account"));
      }
    });
  }
}