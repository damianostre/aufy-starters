import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignUpResponse } from 'aufy-client/src/types';

@Component({
  selector: 'app-sign-up-confirmation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Congratulations! You have successfully signed up!</h1>
    @if (requiresEmailConfirmation) {
      <p>Please check your email for confirmation link and Sign In.</p>
      <p>Don't get the email? 
        <strong><a routerLink="/resend-confirm-email">Resend confirmation email</a></strong>
      </p>
    }
    <p><strong><a routerLink="/signin">Sign In</a></strong></p>
  `
})
export class SignUpConfirmationComponent implements OnInit {
  requiresEmailConfirmation: boolean = false;

  private router = inject(Router);

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as SignUpResponse;
      this.requiresEmailConfirmation = state.requiresEmailConfirmation;
    }
  }
}