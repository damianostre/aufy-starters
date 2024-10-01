import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { extractApiErrors } from 'aufy-client/src/axios-utils';

@Component({
  selector: 'app-sign-up-form-extended',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-form-extended.component.html',
  styleUrls: ['./signup-form-extended.component.css']
})
export class SignUpFormExtendedComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  apiErrors = signal<string[] | undefined>(undefined);
  isSubmitting = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    aboutMe: ['', [Validators.maxLength(100)]],
    mySiteUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
  });

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    try {
      const res = await this.authService.aufy().signUp(this.form.getRawValue());
      await this.router.navigate(['/signup/confirmation'], { state: { ...res } });
    } catch (error) {
      this.apiErrors.set(extractApiErrors(error) ?? ['Error occurred']);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
