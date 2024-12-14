/* tslint:disable */
/* eslint-disable */
import { Condidature } from '../models/condidature';
import { User } from '../models/user';
export interface Offre {
  applications?: Array<Condidature>;
  archived?: boolean;
  dateExpiration?: string;
  datePublication?: string;
  description?: string;
  id?: number;
  lastModification?: string;
  lieu?: string;
  profil?: string;
  publisher?: User;
  responsabilites?: string;
  shareable?: boolean;
  status?: string;
  title?: string;
  typeContrat?: 'Cdi' | 'Stage' | 'cdd';
}
