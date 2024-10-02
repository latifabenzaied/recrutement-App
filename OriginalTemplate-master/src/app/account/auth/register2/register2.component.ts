import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationControllerService } from 'src/app/services/services';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { RegistrationRequest } from 'src/app/services/models';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {
  registerRequest:RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  signupForm: UntypedFormGroup;
  submitted = false;
  error = '';
  successmsg = false;
 

  constructor(private formBuilder: UntypedFormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    private authService:AuthenticationControllerService,
    private userService: UserProfileService) { }
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add('auth-body-bg')

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      // console.log(this.registerRequest.email)
      // this.errorMsg = [];
      this.authService.register({
        body: this.registerRequest
      })
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (err) => {
            this.error = err.error.validationErrors;
          }
        });
    }
    }
  }

