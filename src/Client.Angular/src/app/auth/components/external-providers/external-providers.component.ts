
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {ChallengeMode} from "aufy-client/src/types.js";

@Component({
  selector: 'external-providers',
  standalone: true,
  templateUrl: './external-providers.component.html',
})
export class ExternalProvidersComponent {
  @Input() mode!: ChallengeMode;
  @Input() hide?: string[];

  disabled = false;

  constructor(private authService: AuthService) {}

  challenge(provider: string): void {
    if (this.disabled) return;
    this.authService.aufy().externalChallenge({ provider, mode: this.mode });
    this.disabled = true;
  }
}