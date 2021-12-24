import { IExperience } from './reducer';

export interface IDeleteExperienceResponse {
  success: boolean;
  deletedExperience?: IExperience;
}
