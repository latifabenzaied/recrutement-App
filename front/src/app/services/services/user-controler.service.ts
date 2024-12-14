/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getUserById } from '../fn/user-controler/get-user-by-id';
import { GetUserById$Params } from '../fn/user-controler/get-user-by-id';
import { getUserFavoriteOffers } from '../fn/user-controler/get-user-favorite-offers';
import { GetUserFavoriteOffers$Params } from '../fn/user-controler/get-user-favorite-offers';
import { OffreResponse } from '../models/offre-response';
import { removeFavoriteOffer } from '../fn/user-controler/remove-favorite-offer';
import { RemoveFavoriteOffer$Params } from '../fn/user-controler/remove-favorite-offer';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserControlerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/users/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserFavoriteOffers()` */
  static readonly GetUserFavoriteOffersPath = '/users/favorite-offers/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserFavoriteOffers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFavoriteOffers$Response(params: GetUserFavoriteOffers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OffreResponse>>> {
    return getUserFavoriteOffers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserFavoriteOffers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFavoriteOffers(params: GetUserFavoriteOffers$Params, context?: HttpContext): Observable<Array<OffreResponse>> {
    return this.getUserFavoriteOffers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OffreResponse>>): Array<OffreResponse> => r.body)
    );
  }

  /** Path part for operation `removeFavoriteOffer()` */
  static readonly RemoveFavoriteOfferPath = '/users/favorites/{email}/{offerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeFavoriteOffer()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeFavoriteOffer$Response(params: RemoveFavoriteOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeFavoriteOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeFavoriteOffer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeFavoriteOffer(params: RemoveFavoriteOffer$Params, context?: HttpContext): Observable<void> {
    return this.removeFavoriteOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
