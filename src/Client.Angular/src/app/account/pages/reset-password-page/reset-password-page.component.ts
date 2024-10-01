import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordFormComponent } from '../../components/reset-password-form/reset-password-form.component';

@Component({
  selector: 'reset-password-page',
  standalone: true,
  imports: [CommonModule, ResetPasswordFormComponent],
  template: `
    <div class="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
          <reset-password-form></reset-password-form>
        </div>
      </div>
    </div>
  `
})
export class ResetPasswordPageComponent {}