import { Component, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  navigation = [
    { name: 'Features', href: '/features', current: false },
    { name: 'Docs', href: 'https://aufy.dev/manual/introduction/', current: false }
  ];

  userNavigation = computed(() => {
    return this.authService.isAuthenticated() ? [
      { name: 'My Account', href: '/profile' },
      { name: 'Sign out', href: '/signout' },
    ] : [
      { name: 'Sign in', href: '/signin' },
    ];
  });

  classNames(classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }

  constructor(protected authService: AuthService) {}
}
