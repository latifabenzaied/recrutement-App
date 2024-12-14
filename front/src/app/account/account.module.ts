import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CodeInputModule} from 'angular-code-input';
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    CodeInputModule
  ],
  // providers:[
  //   HttpClient,
  //   {provide: HTTP_INTERCEPTORS,useClass: HTTP_INTERCEPTORS,multi: true},
  // ]
})
export class AccountModule { }
