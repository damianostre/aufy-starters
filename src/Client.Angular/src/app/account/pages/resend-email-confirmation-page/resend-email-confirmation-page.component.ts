import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { extractApiErrors } from 'aufy-client/src/axios-utils';

@Component({
  selector: 'resend-email-confirmation-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resend-email-confirmation-page.component.html'
})
export class ResendEmailConfirmationPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  apiErrors = signal<string[] | null>(null);
  notification = signal<string | null>(null);
  isSubmitting = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.form.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.apiErrors.set(null);

      const email = this.form.get('email')?.getRawValue();
      this.authService.aufy().resendEmailConfirmation(email).then(() => {
          this.apiErrors.set(null);
          this.notification.set("Email sent successfully");
          this.form.reset();
          this.isSubmitting.set(false);
        })
        .catch((error) => {
          this.apiErrors.set(extractApiErrors(error) ?? ["An error occurred"]);
          this.isSubmitting.set(false);
        });
    }
  }
}