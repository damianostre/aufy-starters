import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExternalProvidersComponent } from '../../components/external-providers/external-providers.component';
import { SignUpFormExtendedComponent } from '../../components/signup-form-extended/signup-form-extended.component';

@Component({
  selector: 'signup-extended-page',
  standalone: true,
  imports: [RouterLink, ExternalProvidersComponent, SignUpFormExtendedComponent],
  templateUrl: './signup-extended-page.component.html'
})
export class SignUpExtendedPageComponent {}