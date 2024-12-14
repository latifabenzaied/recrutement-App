/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Condidature } from '../models/condidature';
import { CondidatureResponse } from '../models/condidature-response';
import { createCondidature } from '../fn/condidature-controller/create-condidature';
import { CreateCondidature$Params } from '../fn/condidature-controller/create-condidature';
import { downloadCv } from '../fn/condidature-controller/download-cv';
import { DownloadCv$Params } from '../fn/condidature-controller/download-cv';
import { getCandidaturesByOffre } from '../fn/condidature-controller/get-candidatures-by-offre';
import { GetCandidaturesByOffre$Params } from '../fn/condidature-controller/get-candidatures-by-offre';
import { getCandidaturesByUser } from '../fn/condidature-controller/get-candidatures-by-user';
import { GetCandidaturesByUser$Params } from '../fn/condidature-controller/get-candidatures-by-user';
import { updateCondidatureStatus } from '../fn/condidature-controller/update-condidature-status';
import { UpdateCondidatureStatus$Params } from '../fn/condidature-controller/update-condidature-status';

@Injectable({ providedIn: 'root' })
export class CondidatureControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createCondidature()` */
  static readonly CreateCondidaturePath = '/condidature/Add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCondidature()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCondidature$Response(params: CreateCondidature$Params, context?: HttpContext): Observable<StrictHttpResponse<Condidature>> {
    return createCondidature(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCondidature$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCondidature(params: CreateCondidature$Params, context?: HttpContext): Observable<Condidature> {
    return this.createCondidature$Response(params, context).pipe(
      map((r: StrictHttpResponse<Condidature>): Condidature => r.body)
    );
  }

  /** Path part for operation `updateCondidatureStatus()` */
  static readonly UpdateCondidatureStatusPath = '/condidature/editstatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCondidatureStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCondidatureStatus$Response(params: UpdateCondidatureStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Condidature>> {
    return updateCondidatureStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCondidatureStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateCondidatureStatus(params: UpdateCondidatureStatus$Params, context?: HttpContext): Observable<Condidature> {
    return this.updateCondidatureStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Condidature>): Condidature => r.body)
    );
  }

  /** Path part for operation `getCandidaturesByOffre()` */
  static readonly GetCandidaturesByOffrePath = '/condidature/getByOffre/{offreId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCandidaturesByOffre()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidaturesByOffre$Response(params: GetCandidaturesByOffre$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CondidatureResponse>>> {
    return getCandidaturesByOffre(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCandidaturesByOffre$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidaturesByOffre(params: GetCandidaturesByOffre$Params, context?: HttpContext): Observable<Array<CondidatureResponse>> {
    return this.getCandidaturesByOffre$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CondidatureResponse>>): Array<CondidatureResponse> => r.body)
    );
  }

  /** Path part for operation `getCandidaturesByUser()` */
  static readonly GetCandidaturesByUserPath = '/condidature/get/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCandidaturesByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidaturesByUser$Response(params: GetCandidaturesByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CondidatureResponse>>> {
    return getCandidaturesByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCandidaturesByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidaturesByUser(params: GetCandidaturesByUser$Params, context?: HttpContext): Observable<Array<CondidatureResponse>> {
    return this.getCandidaturesByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CondidatureResponse>>): Array<CondidatureResponse> => r.body)
    );
  }

  /** Path part for operation `downloadCv()` */
  static readonly DownloadCvPath = '/condidature/download-cv/{fileName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadCv()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadCv$Response(params: DownloadCv$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return downloadCv(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `downloadCv$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadCv(params: DownloadCv$Params, context?: HttpContext): Observable<Blob> {
    return this.downloadCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
