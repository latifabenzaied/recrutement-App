import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Register2Component } from './register2/register2.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ActiviateAccountComponent } from './activiate-account/activiate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token/token.service';
@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent, Register2Component, Recoverpwd2Component, ActiviateAccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    CodeInputModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AuthModule { }
