import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import { extractApiErrors } from 'aufy-client/src/axios-utils';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  standalone: true,
})
export class SignUpFormComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
  });

  apiErrors = signal<string[] | null>(null);
  isSubmitting = signal(false);


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    try {
      const res =await this.authService.aufy().signUp(this.form.getRawValue());
      await this.router.navigate(['/signup/confirmation'], { state: { ...res } });
    } catch (error) {
      this.apiErrors.set(extractApiErrors(error) ?? ['Error occurred']);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
