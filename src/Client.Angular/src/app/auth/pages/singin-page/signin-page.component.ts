import { Component } from '@angular/core';
import { ExternalProvidersComponent } from '../../components/external-providers/external-providers.component';
import { SignInFormComponent } from '../../components/signin-form/signin-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'signin-page',
  standalone: true,
  imports: [
    ExternalProvidersComponent,
    SignInFormComponent,
    RouterLink,
  ],
  templateUrl: './signin-page.component.html',
})
export class SignInPageComponent {  
  // Component logic goes here
}
