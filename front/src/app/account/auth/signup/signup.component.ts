import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { AuthenticationControllerService } from 'src/app/services/services';
import { RegistrationRequest } from 'src/app/services/models';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerRequest:RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  signupForm: UntypedFormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,
     private route: ActivatedRoute, 
     private router: Router, 
     private authService:AuthenticationControllerService,
    private userService: UserProfileService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      this.registerRequest.firstname= this.f.username.value;
      this.registerRequest.lastname= this.f.lastname.value;
      this.registerRequest.email= this.f.email.value;
      this.registerRequest.password = this.f.password.value;
      this.authService.register({
        body: this.registerRequest
      })
        .subscribe({
          next: () => {
            this.router.navigate(['account/activiate-account']);
          },
          error: (err) => {
            this.error = err.error.validationErrors;
          }
        });
    }
    }
}
