import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpFormComponent } from '../../components/signup-form/signup-form.component';
import { ExternalProvidersComponent } from '../../components/external-providers/external-providers.component';

@Component({
  selector: 'signup-page',
  standalone: true,
  imports: [RouterLink, SignUpFormComponent, ExternalProvidersComponent],
  templateUrl: './signup-page.component.html',
})
export class SignUpPageComponent {}