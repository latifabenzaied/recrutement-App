/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addFavorite } from '../fn/offre-controller/add-favorite';
import { AddFavorite$Params } from '../fn/offre-controller/add-favorite';
import { deleteOffre } from '../fn/offre-controller/delete-offre';
import { DeleteOffre$Params } from '../fn/offre-controller/delete-offre';
import { getAllOffres } from '../fn/offre-controller/get-all-offres';
import { GetAllOffres$Params } from '../fn/offre-controller/get-all-offres';
import { getNonArchivedOffres } from '../fn/offre-controller/get-non-archived-offres';
import { GetNonArchivedOffres$Params } from '../fn/offre-controller/get-non-archived-offres';
import { getOffreById } from '../fn/offre-controller/get-offre-by-id';
import { GetOffreById$Params } from '../fn/offre-controller/get-offre-by-id';
import { OffreResponse } from '../models/offre-response';
import { saveBook } from '../fn/offre-controller/save-book';
import { SaveBook$Params } from '../fn/offre-controller/save-book';
import { test } from '../fn/offre-controller/test';
import { Test$Params } from '../fn/offre-controller/test';
import { updateArchivedStatus } from '../fn/offre-controller/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/offre-controller/update-archived-status';
import { updateOffre } from '../fn/offre-controller/update-offre';
import { UpdateOffre$Params } from '../fn/offre-controller/update-offre';

@Injectable({ providedIn: 'root' })
export class OffreControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateOffre()` */
  static readonly UpdateOffrePath = '/offre/update/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOffre()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOffre$Response(params: UpdateOffre$Params, context?: HttpContext): Observable<StrictHttpResponse<OffreResponse>> {
    return updateOffre(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOffre$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOffre(params: UpdateOffre$Params, context?: HttpContext): Observable<OffreResponse> {
    return this.updateOffre$Response(params, context).pipe(
      map((r: StrictHttpResponse<OffreResponse>): OffreResponse => r.body)
    );
  }

  /** Path part for operation `addFavorite()` */
  static readonly AddFavoritePath = '/offre/addFavorite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  addFavorite$Response(params: AddFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addFavorite(params: AddFavorite$Params, context?: HttpContext): Observable<string> {
    return this.addFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `saveBook()` */
  static readonly SaveBookPath = '/offre/AddOffre';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook$Response(params: SaveBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBook(params: SaveBook$Params, context?: HttpContext): Observable<number> {
    return this.saveBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/offre/archived/{offer-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getOffreById()` */
  static readonly GetOffreByIdPath = '/offre/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOffreById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOffreById$Response(params: GetOffreById$Params, context?: HttpContext): Observable<StrictHttpResponse<OffreResponse>> {
    return getOffreById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOffreById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOffreById(params: GetOffreById$Params, context?: HttpContext): Observable<OffreResponse> {
    return this.getOffreById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OffreResponse>): OffreResponse => r.body)
    );
  }

  /** Path part for operation `test()` */
  static readonly TestPath = '/offre/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `test()` instead.
   *
   * This method doesn't expect any request body.
   */
  test$Response(params: Test$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return test(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `test$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  test(params: Test$Params, context?: HttpContext): Observable<number> {
    return this.test$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getNonArchivedOffres()` */
  static readonly GetNonArchivedOffresPath = '/offre/non-archived';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNonArchivedOffres()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonArchivedOffres$Response(params?: GetNonArchivedOffres$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OffreResponse>>> {
    return getNonArchivedOffres(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNonArchivedOffres$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonArchivedOffres(params?: GetNonArchivedOffres$Params, context?: HttpContext): Observable<Array<OffreResponse>> {
    return this.getNonArchivedOffres$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OffreResponse>>): Array<OffreResponse> => r.body)
    );
  }

  /** Path part for operation `getAllOffres()` */
  static readonly GetAllOffresPath = '/offre/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOffres()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOffres$Response(params?: GetAllOffres$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OffreResponse>>> {
    return getAllOffres(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOffres$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOffres(params?: GetAllOffres$Params, context?: HttpContext): Observable<Array<OffreResponse>> {
    return this.getAllOffres$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OffreResponse>>): Array<OffreResponse> => r.body)
    );
  }

  /** Path part for operation `deleteOffre()` */
  static readonly DeleteOffrePath = '/offre/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOffre()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOffre$Response(params: DeleteOffre$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOffre(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOffre$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOffre(params: DeleteOffre$Params, context?: HttpContext): Observable<void> {
    return this.deleteOffre$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
