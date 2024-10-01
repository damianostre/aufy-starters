import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'challenge-callback-page',
  template: '<h1>Authenticating...</h1>',
  standalone: true
})
export class ChallengeCallbackPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    const signup = this.route.snapshot.queryParamMap.get('signup');
    const failed = this.route.snapshot.queryParamMap.get('failed');

    if (failed) {
      this.router.navigate(['/signin']);
    } else if (!signup) {
      this.authService.aufy().signInExternal().then(() => {
        this.router.navigate(['/profile']);
      }).catch(() => {
        this.router.navigate(['/signin'], { queryParams: { error: 'external-signin-failed' } });
      });
    } else {
      this.router.navigate(['/signup-external']);
    }
  }
}