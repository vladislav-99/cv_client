import actionCreatorFactory from 'typescript-fsa';
import { ITechnology } from '../reducer';

const actionCreator = actionCreatorFactory();

export enum technologyActions {
  FETCH_TECHNOLOGIES = 'FETCH_TECHNOLOGIES'
}

export const fetchTechnologies = actionCreator.async<void, ITechnology[]>(
  technologyActions.FETCH_TECHNOLOGIES
);
