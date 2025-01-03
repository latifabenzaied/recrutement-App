/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Condidature } from '../../models/condidature';

export interface CreateCondidature$Params {
  email: string;
  offreId: number;
  body?: Blob;

}

export function createCondidature(http: HttpClient, rootUrl: string, params: CreateCondidature$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const formData = new FormData();
  
  // Vérifier si params.body est un File, sinon utiliser Blob
  if (params.body instanceof File) {
    formData.append('cv', params.body, params.body.name); // Ajouter le fichier avec son nom original
  } else {
    // Si body n'est pas un File, utiliser un nom par défaut pour Blob
    const fileName = 'file'; // Nom par défaut si body n'est pas un File
    formData.append('cv', params.body || new Blob(), fileName);
  }

  formData.append('email', params.email);
  formData.append('offreId', params.offreId.toString());

  const headers = new HttpHeaders({
    'Accept': 'application/json'
  });

  return http.post<StrictHttpResponse<string>>(
    `${rootUrl}${createCondidature.PATH}`,
    formData,
    { headers: headers, context: context, observe: 'response' }
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

createCondidature.PATH = '/condidature/Add';
