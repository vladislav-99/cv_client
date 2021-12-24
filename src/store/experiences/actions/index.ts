import actionCreatorFactory from 'typescript-fsa';
import { IExperience } from '../reducer';
import { IDeleteExperienceResponse } from '../types';

const actionCreator = actionCreatorFactory();

export enum educationActions {
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES',
  CREATE_EXPERIENCES = 'CREATE_EXPERIENCES',
  DELETE_EXPERIENCE = 'DELETE_EXPERIENCE'
}

export const fetchExperiences = actionCreator.async<void, IExperience[]>(
  educationActions.FETCH_EXPERIENCES
);

export const createExperiences = actionCreator.async<string[], IExperience[]>(
  educationActions.CREATE_EXPERIENCES
);

export const deleteExperience = actionCreator.async<
  number,
  IDeleteExperienceResponse
>(educationActions.DELETE_EXPERIENCE);
