/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OffreRequest } from '../../models/offre-request';
import { OffreResponse } from '../../models/offre-response';

export interface UpdateOffre$Params {
  id: number;
      body: OffreRequest
}

export function updateOffre(http: HttpClient, rootUrl: string, params: UpdateOffre$Params, context?: HttpContext): Observable<StrictHttpResponse<OffreResponse>> {
  const rb = new RequestBuilder(rootUrl, updateOffre.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OffreResponse>;
    })
  );
}

updateOffre.PATH = '/offre/update/{id}';
