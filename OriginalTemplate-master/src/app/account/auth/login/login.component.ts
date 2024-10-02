import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationControllerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  authRequest: AuthenticationRequest= {email: '', password: ''};
  errorMsg: Array<string> = [];
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    private authService:AuthenticationControllerService,
    private tokenservice:TokenService,) { }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
    get f() {
      return this.loginForm.controls;
    }
  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authRequest.email = this.f.email.value;
    this.authRequest.password = this.f.password.value;
        this.authService.authenticate$Response({
          body: this.authRequest
        }).subscribe({
          next: (response) => {
            if (response.body instanceof Blob) {
              response.body.text().then(text => {
                try {
                  const jsonResponse = JSON.parse(text);
                  console.log('Full Response:', jsonResponse);
                  console.log('Token:', jsonResponse.token); // Accès au token
                  this.tokenservice.token = jsonResponse.token;
                  this.router.navigate(['']);
                } catch (err) {
                  console.error('Erreur lors de la conversion du Blob en JSON:', err);
                }
              }).catch(err => {
                console.error('Erreur lors de la lecture du Blob:', err);
              });
            } else {
              console.error('La réponse n\'est pas un Blob:', response.body);
            }
          },
          error: (err) => {
          
            console.error('Error:', err);

            if (err.error && err.error.validationErrors) {
              this.error = 'Erreur de validation : ' + err.error.validationErrors.join(', ');
            } else if (err.error && err.error.error) {
              this.error = err.error.error; // Message d'erreur spécifique du backend
            } else if (err.status === 404) {
              this.error = 'Utilisateur non trouvé. Veuillez vérifier vos informations de connexion.';
            } else {
              this.error = 'Erreur inconnue. Veuillez réessayer plus tard.';
            }
          }
        });
      }}

    }

