import actionCreatorFactory from 'typescript-fsa';
import { ITechnology, TechnologyTypes } from '../types';
import { IDeleteTechnologyResponse } from '../types';

const actionCreator = actionCreatorFactory();

export enum technologyActions {
  FETCH_TECHNOLOGIES = 'FETCH_TECHNOLOGIES',
  FETCH_EDIT_TECHNOLOGY = 'FETCH_EDIT_TECHNOLOGY',

  CREATE_TECHNOLOGIES = 'CREATE_TECHNOLOGIES',
  DELETE_TECHNOLOGIES = 'DELETE_TECHNOLOGIES',
  DELETE_TECHNOLOGY_ALLOW = 'DELETE_TECHNOLOGY_ALLOW',
  DELETE_TECHNOLOGY_CANCEL = 'DELETE_TECHNOLOGY_CANCEL',
  EDIT_TECHNOLOGY = 'EDIT_TECHNOLOGY',
  EDIT_TECHNOLOGY_CANCEL = 'EDIT_TECHNOLOGY_CANCEL',

  SEARCH_TECHNOLOGY_FILTER = 'SEARCH_TECHNOLOGY_FILTER',
}


export const deleteTechnologyAllow = actionCreator<{ id: number }>(
  technologyActions.DELETE_TECHNOLOGY_ALLOW
);

export const deleteTechnologyCancel = actionCreator(
  technologyActions.DELETE_TECHNOLOGY_CANCEL
);

export const editTechnology = actionCreator<{ id: number }>(
  technologyActions.EDIT_TECHNOLOGY
);

export const editTechnologyCancel = actionCreator(
  technologyActions.EDIT_TECHNOLOGY_CANCEL
);

export const searchTechnologyFilter = actionCreator<string>(
  technologyActions.SEARCH_TECHNOLOGY_FILTER
);

export const fetchTechnologies = actionCreator.async<void, ITechnology[]>(
  technologyActions.FETCH_TECHNOLOGIES
);

export const fetchEditTechnology = actionCreator.async<ITechnology, ITechnology>(
  technologyActions.FETCH_EDIT_TECHNOLOGY
);

export const createTechnologies = actionCreator.async<{ name: string, type: TechnologyTypes }[], ITechnology[]>(
  technologyActions.CREATE_TECHNOLOGIES
);

export const deleteTechnology = actionCreator.async<
  number,
  IDeleteTechnologyResponse
>(technologyActions.DELETE_TECHNOLOGIES);
