import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {extractApiErrors} from "aufy-client/src/axios-utils";

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  standalone: true
})
export class SignUpFormComponent {
  form: FormGroup;
  apiErrors: string[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    try {
      await this.authService.aufy().signUp(this.form.value);
      await this.router.navigate(['/']);
    } catch (error) {
      this.apiErrors = this.extractApiErrors(error) ?? ['Error occurred'];
    } finally {
      this.isSubmitting = false;
    }
  }
}
