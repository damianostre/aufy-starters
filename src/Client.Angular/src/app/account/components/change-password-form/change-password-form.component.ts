import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { extractApiErrors } from 'aufy-client/src/axios-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'change-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent {
  apiErrors = signal<string[] | undefined>(undefined);
  notification = signal<string | undefined>(undefined);
  isSubmitting = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', [Validators.required, Validators.minLength(6), this.passwordMatchValidator]]
  });

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmNewPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      this.authService.aufy().changePassword(this.form.getRawValue())
        .then(() => {
            this.notification.set("Password changed successfully");
            this.apiErrors.set(undefined);
            this.isSubmitting.set(false);
          })
          .catch((error) => {
            this.apiErrors.set(extractApiErrors(error) ?? ["Error occurred"]);
            this.notification.set(undefined);
            this.isSubmitting.set(false);
          });
    }
  }
}