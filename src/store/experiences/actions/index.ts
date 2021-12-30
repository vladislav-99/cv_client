import actionCreatorFactory from 'typescript-fsa';
import { IDeleteExperienceResponse, IExperience } from '../types';

const actionCreator = actionCreatorFactory();

export enum experiencesActions {
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES',
  CREATE_EXPERIENCES = 'CREATE_EXPERIENCES',
  DELETE_EXPERIENCE = 'DELETE_EXPERIENCE'
}

export const fetchExperiences = actionCreator.async<void, IExperience[]>(
  experiencesActions.FETCH_EXPERIENCES
);

export const createExperiences = actionCreator.async<string[], IExperience[]>(
  experiencesActions.CREATE_EXPERIENCES
);

export const deleteExperience = actionCreator.async<
  number,
  IDeleteExperienceResponse
>(experiencesActions.DELETE_EXPERIENCE);
