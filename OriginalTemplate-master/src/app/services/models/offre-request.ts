/* tslint:disable */
/* eslint-disable */
export interface OffreRequest {
  description: string;
  expirationDate: string;
  id?: number;
  profil: string;
  publisher?: string;
  responsabilites: string;
  shareable?: boolean;
  title: string;
  typeContrat?: 'Cdi' | 'Stage' | 'cdd';
}
