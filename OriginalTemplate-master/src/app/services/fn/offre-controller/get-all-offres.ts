/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OffreResponse } from '../../models/offre-response';

export interface GetAllOffres$Params {
}

export function getAllOffres(http: HttpClient, rootUrl: string, params?: GetAllOffres$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OffreResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllOffres.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OffreResponse>>;
    })
  );
}

getAllOffres.PATH = '/offre/all';
