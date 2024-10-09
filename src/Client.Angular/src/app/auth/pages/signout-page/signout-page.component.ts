import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-out',
  template: '', // Empty template as we're just redirecting
})
export class SignOutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.aufy().signOut().then(() => {
      // Do nothing
    }).catch(() => {
      // Do nothing
    }).finally(() => {
      this.router.navigate(['/']);
    });
  }
}