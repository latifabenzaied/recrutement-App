/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RemoveFavoriteOffer$Params {
  email: string;
  offerId: number;
}

export function removeFavoriteOffer(http: HttpClient, rootUrl: string, params: RemoveFavoriteOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, removeFavoriteOffer.PATH, 'delete');
  if (params) {
    rb.path('email', params.email, {});
    rb.path('offerId', params.offerId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

removeFavoriteOffer.PATH = '/users/favorites/{email}/{offerId}';
