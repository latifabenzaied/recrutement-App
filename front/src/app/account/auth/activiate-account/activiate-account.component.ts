import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {skipUntil} from 'rxjs/operators';
// import {CodeInputModule} from 'angular-code-input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationControllerService } from 'src/app/services/services';
@Component({
  selector: 'app-activiate-account',
  templateUrl: './activiate-account.component.html',
  styleUrls: ['./activiate-account.component.scss']
})
export class ActiviateAccountComponent  {

  message = '';
  isOkay = true;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {}

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
  redirectToLogin() {
    this.router.navigate(['account/login']);
  }
  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }
  protected readonly skipUntil = skipUntil;

}
