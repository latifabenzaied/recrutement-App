/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Condidature } from '../../models/condidature';

export interface UpdateCondidatureStatus$Params {
  id: number;
  status: 'SOUMIS' | 'EN_REVISION' | 'ENTRETIEN_PROGRAMME' | 'ENTRETIEN_REALISE' | 'ACCEPTE' | 'REFUSE' | 'ARCHIVES';
  customMessage?: string;
}

export function updateCondidatureStatus(http: HttpClient, rootUrl: string, params: UpdateCondidatureStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Condidature>> {
  const rb = new RequestBuilder(rootUrl, updateCondidatureStatus.PATH, 'patch');
  if (params) {
    rb.query('id', params.id, {});
    rb.query('status', params.status, {});
    rb.query('customMessage', params.customMessage, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Condidature>;
    })
  );
}

updateCondidatureStatus.PATH = '/condidature/editstatus';
