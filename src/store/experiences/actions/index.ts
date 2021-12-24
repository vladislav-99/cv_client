import actionCreatorFactory from 'typescript-fsa';
import { IExperience } from '../reducer';

const actionCreator = actionCreatorFactory();

export enum educationActions {
  FETCH_EXPERIENCES = 'FETCH_EXPERIENCES'
}

export const fetchExperiences = actionCreator.async<void, IExperience[]>(
  educationActions.FETCH_EXPERIENCES
);
