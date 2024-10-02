/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CondidatureResponse } from '../../models/condidature-response';

export interface GetCandidaturesByOffre$Params {
  offreId: number;
}

export function getCandidaturesByOffre(http: HttpClient, rootUrl: string, params: GetCandidaturesByOffre$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CondidatureResponse>>> {
  const rb = new RequestBuilder(rootUrl, getCandidaturesByOffre.PATH, 'get');
  if (params) {
    rb.path('offreId', params.offreId, {});
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

getCandidaturesByOffre.PATH = '/condidature/getByOffre/{offreId}';
