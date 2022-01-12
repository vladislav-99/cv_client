import actionCreatorFactory from 'typescript-fsa';
import { IDeleteExperienceResponse, IExperience } from '../types';

const actionCreator = actionCreatorFactory();

export enum experiencesActions {
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES',
  CREATE_EXPERIENCES = 'CREATE_EXPERIENCES',
  DELETE_EXPERIENCE = 'DELETE_EXPERIENCE',
  DELETE_EXPERIENCE_ALLOW = 'DELETE_EXPERIENCE_ALLOW',
  DELETE_EXPERIENCE_CANCEL = 'DELETE_EXPERIENCE_CANCEL'
}

export const deleteExperienceAllow = actionCreator<{id:number}>(
  experiencesActions.DELETE_EXPERIENCE_ALLOW
);

export const deleteExperienceCancel = actionCreator(
  experiencesActions.DELETE_EXPERIENCE_CANCEL
);

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
