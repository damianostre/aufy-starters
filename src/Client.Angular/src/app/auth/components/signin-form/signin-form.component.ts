import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {extractApiErrors} from "aufy-client/src/axios-utils";

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SignInFormComponent {
  isSubmitting = false;
  apiErrors: string[] | undefined;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.apiErrors = undefined;

    try {
      await this.authService.aufy().signIn(this.form.getRawValue());
      await this.router.navigate(['/']);
    } catch (error) {
      this.apiErrors = extractApiErrors(error) ?? ['Error occurred'];
    } finally {
      this.isSubmitting = false;
    }
  }
}
