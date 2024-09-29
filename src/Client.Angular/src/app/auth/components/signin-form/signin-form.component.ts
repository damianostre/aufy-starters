import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  form: FormGroup;
  isSubmitting = false;
  apiErrors: string[] | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.apiErrors = undefined;

    try {
      await this.authService.aufy().signIn(this.form.value);
      await this.router.navigate(['/']);
    } catch (error) {
      this.apiErrors = this.extractApiErrors(error) ?? ['Error occurred'];
    } finally {
      this.isSubmitting = false;
    }
  }

  private extractApiErrors(error: any): string[] | undefined {
    // Implement error extraction logic here
    return undefined;
  }
}
