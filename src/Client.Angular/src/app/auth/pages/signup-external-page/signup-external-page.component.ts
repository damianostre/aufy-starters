import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-external',
  standalone: true,
  template: `
    <h1>Signing up...</h1>
  `
})
export class SignUpExternalComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.aufy().signUpExternal({}).then(() => {
      this.router.navigate(['/profile']);
    }).catch(() => {
      this.router.navigate(['/signin'], { queryParams: { error: 'external-signin-failed' } });
    });
  }
}