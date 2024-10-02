/* tslint:disable */
/* eslint-disable */
export interface CondidatureResponse {
  appliedDate?: string;
  cvPath?: string;
  etat?: 'SOUMIS' | 'EN_REVISION' | 'ENTRETIEN_PROGRAMME' | 'ENTRETIEN_REALISE' | 'ACCEPTE' | 'REFUSE' | 'ARCHIVES';
  id?: number;
  titleoffre?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}
