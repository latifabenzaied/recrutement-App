import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {jwtDecode}from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }
  
  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService;
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  getUserId(): string | null {
    const token = this.token;
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub; // Change 'userId' to the actual key in your token payload
  }
  getDecodedToken(): any {
    const token = this.token;
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Token invalide', error);
      }
    }
    return null;
  }


  hasRole(role: string): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.authorities && decodedToken.authorities.includes(role);
  }
  getFirstName(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.fullName || null; // Change 'firstName' to the actual key in your token payload
  }


}
