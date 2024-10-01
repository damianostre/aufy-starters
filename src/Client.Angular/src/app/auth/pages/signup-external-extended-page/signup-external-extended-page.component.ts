import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { extractApiErrors } from 'aufy-client/src/axios-utils';

@Component({
  selector: 'app-sign-up-external-extended',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up-external-extended.component.html'
})
export class SignUpExternalExtendedComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  form = this.fb.nonNullable.group({
    aboutMe: ['', [Validators.maxLength(100)]],
    mySiteUrl: ['', [Validators.required, Validators.pattern('https?://.*')]]
  });
  apiErrors = signal<string[] | undefined>(undefined);
  isSubmitting = signal<boolean>(false);

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      
      this.authService.aufy().signUpExternal(this.form.getRawValue()).then(() => {
        this.router.navigate(['/profile']);
      }).catch((error) => {
        this.apiErrors.set(extractApiErrors(error) ?? ['Error occurred']);
      }).finally(() => {
        this.isSubmitting.set(false);
      });
    }
  }
}