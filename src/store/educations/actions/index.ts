import { IEducation } from '../types';
import actionCreatorFactory from 'typescript-fsa';
import { IDeleteEducationResponse } from '../types';

const actionCreator = actionCreatorFactory();

export enum educationActions {
  FETCH_EDUCATIONS = 'FETCH_EDUCATIONS',
  CREATE_EDUCATIONS = 'CREATE_EDUCATIONS',
  DELETE_EDUCATIONS = 'DELETE_EDUCATIONS',
  DELETE_EDUCATION_ALLOW = 'DELETE_EDUCATION_ALLOW',
  DELETE_EDUCATION_CANCEL = 'DELETE_EDUCATION_CANCEL',
  EDIT_EDUCATION = 'EDIT_EDUCATION',
  EDIT_EDUCATION_CANCEL = 'EDIT_EDUCATION_CANCEL'
}

export const deleteEducationAllow = actionCreator<{ id: number }>(
  educationActions.DELETE_EDUCATION_ALLOW
);

export const deleteEducationCancel = actionCreator(
  educationActions.DELETE_EDUCATION_CANCEL
);

export const editEducation = actionCreator<{ id: number }>(
  educationActions.EDIT_EDUCATION
);

export const editEducationCancel = actionCreator(
  educationActions.EDIT_EDUCATION_CANCEL
);

export const fetchEditEducation = actionCreator<{ id: number }>(
  educationActions.EDIT_EDUCATION
);

export const fetchEducations = actionCreator.async<void, IEducation[]>(
  educationActions.FETCH_EDUCATIONS
);

export const fetchCreateEducations = actionCreator.async<string[], IEducation[]>(
  educationActions.CREATE_EDUCATIONS
);

export const fetchDeleteEducation = actionCreator.async<
  number,
  IDeleteEducationResponse
>(educationActions.DELETE_EDUCATIONS);
