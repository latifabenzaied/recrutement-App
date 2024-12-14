/* tslint:disable */
/* eslint-disable */
import { Offre } from '../models/offre';
import { User } from '../models/user';
export interface Condidature {
  appliedDate?: string;
  cvPath?: string;
  etat?: 'SOUMIS' | 'EN_REVISION' | 'ENTRETIEN_PROGRAMME' | 'ENTRETIEN_REALISE' | 'ACCEPTE' | 'REFUSE' | 'ARCHIVES';
  id?: number;
  offre?: Offre;
  user?: User;
}
