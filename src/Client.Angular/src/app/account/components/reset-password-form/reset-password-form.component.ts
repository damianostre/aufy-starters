
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { extractApiErrors } from 'aufy-client/src/axios-utils';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ResetPasswordFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  resetForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
  });

  apiErrors = signal<string[] | undefined>(undefined);
  isSubmitting = signal(false);
  code: string;

  constructor() {
    this.code = this.route.snapshot.queryParamMap.get('code') ?? '';
    if (!this.code) {
      throw new Error('Invalid code');
    }
  }

  onSubmit(): void {
    if (this.resetForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.apiErrors.set(undefined);

      const { email, password } = this.resetForm.getRawValue();
      this.authService.aufy().resetPassword({ email, password, code: this.code }).then(() => {
          this.router.navigate(['/reset-password/confirmation']);
        }).catch((error) => {
          this.apiErrors.set(extractApiErrors(error) ?? ['An error occurred']);
          this.isSubmitting.set(false);
        });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }
}
