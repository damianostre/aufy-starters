import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'confirm-email-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-email-page.component.html'
})
export class ConfirmEmailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = signal(false);
  success = signal(false);
  valid = signal(false);

  code = signal<string | null>(null);
  userId = signal<string | null>(null);

  constructor() {
    const params = this.route.snapshot.queryParamMap;
    this.code.set(params.get('code'));
    this.userId.set(params.get('userId'));
    this.valid.set(!!this.code() && !!this.userId());

    effect(() => {
      if (this.valid()) {
        this.confirmEmail();
      }
    });
  }

  private confirmEmail() {
    this.loading.set(true);
    this.authService.aufy().confirmEmail(this.code()!, this.userId()!)
      .then(() => {
          this.loading.set(false);
          this.success.set(true);
        })
        .catch(() => {
          this.loading.set(false);
          this.success.set(false);
        });
  }
}