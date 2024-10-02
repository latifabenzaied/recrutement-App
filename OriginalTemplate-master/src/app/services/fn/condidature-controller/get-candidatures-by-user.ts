/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CondidatureResponse } from '../../models/condidature-response';

export interface GetCandidaturesByUser$Params {
  email: string;
}

export function getCandidaturesByUser(http: HttpClient, rootUrl: string, params: GetCandidaturesByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CondidatureResponse>>> {
  const rb = new RequestBuilder(rootUrl, getCandidaturesByUser.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CondidatureResponse>>;
    })
  );
}

getCandidaturesByUser.PATH = '/condidature/get/{email}';
