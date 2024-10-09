import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'reset-password-confirmation-page',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Your password has been reset.</h1>
    <p><strong><a routerLink="/signin">Sign In</a></strong></p>
  `,
})
export class ResetPasswordConfirmationPageComponent {
}