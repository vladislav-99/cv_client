import actionCreatorFactory from 'typescript-fsa';
import { IDeleteExperienceResponse, IExperience } from '../types';

const actionCreator = actionCreatorFactory();

export enum experiencesActions {
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES',
  FETCH_EDIT_EXPERIENCE = 'FETCH_EDIT_EXPERIENCE',

  CREATE_EXPERIENCES = 'CREATE_EXPERIENCES',
  DELETE_EXPERIENCE = 'DELETE_EXPERIENCE',
  DELETE_EXPERIENCE_ALLOW = 'DELETE_EXPERIENCE_ALLOW',
  DELETE_EXPERIENCE_CANCEL = 'DELETE_EXPERIENCE_CANCEL',
  EDIT_EXPERIENCE = 'EDIT_EXPERIENCE',
  EDIT_EXPERIENCE_CANCEL = 'EDIT_EXPERIENCE_CANCEL'
}

export const deleteExperienceAllow = actionCreator<{ id: number }>(
  experiencesActions.DELETE_EXPERIENCE_ALLOW
);

export const deleteExperienceCancel = actionCreator(
  experiencesActions.DELETE_EXPERIENCE_CANCEL
);


export const editExperience = actionCreator<{ id: number }>(
  experiencesActions.EDIT_EXPERIENCE
);

export const editExperienceCancel = actionCreator(
  experiencesActions.EDIT_EXPERIENCE_CANCEL
);


export const fetchExperiences = actionCreator.async<void, IExperience[]>(
  experiencesActions.FETCH_EXPERIENCES
);

export const fetchEditExperience = actionCreator.async<IExperience, IExperience>(
  experiencesActions.FETCH_EDIT_EXPERIENCE
);

export const fetchCreateExperiences = actionCreator.async<string[], IExperience[]>(
  experiencesActions.CREATE_EXPERIENCES
);

export const fetchDeleteExperience = actionCreator.async<
  number,
  IDeleteExperienceResponse
>(experiencesActions.DELETE_EXPERIENCE);
