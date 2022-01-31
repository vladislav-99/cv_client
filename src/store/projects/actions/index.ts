import actionCreatorFactory from 'typescript-fsa';
import { IProject, IDeleteProjectResponse, CreateProjectType, UpdateProjectType } from '../types';

const actionCreator = actionCreatorFactory();

export enum projectActions {
  FETCH_PROJECTS = 'FETCH_PROJECTS',
  FETCH_PROJECT = 'FETCH_PROJECT',
  FETCH_EDIT_PROJECT = 'FETCH_EDIT_PROJECT',
  CREATE_PROJECT = 'CREATE_PROJECT',
  DELETE_PROJECTS = 'DELETE_PROJECTS',
  DELETE_PROJECT_ALLOW = 'DELETE_PROJECT_ALLOW',
  DELETE_PROJECT_CANCEL = 'DELETE_PROJECT_CANCEL',
  EDIT_PROJECT = 'EDIT_PROJECT',
  EDIT_PROJECT_CANCEL = 'EDIT_PROJECT_CANCEL'
}

export const deleteProjectAllow = actionCreator<{ id: number }>(
  projectActions.DELETE_PROJECT_ALLOW
);

export const deleteProjectCancel = actionCreator(
  projectActions.DELETE_PROJECT_CANCEL
);

export const editProject = actionCreator<{ id: number }>(
  projectActions.EDIT_PROJECT
);

export const editProjectCancel = actionCreator(
  projectActions.EDIT_PROJECT_CANCEL
);

export const fetchProjects = actionCreator.async<void, IProject[]>(
  projectActions.FETCH_PROJECTS
);

export const fetchProjectById = actionCreator.async<number, IProject>(
  projectActions.FETCH_PROJECT
);

export const fetchEditProject = actionCreator.async<UpdateProjectType, IProject>(
  projectActions.FETCH_EDIT_PROJECT
);

export const fetchCreateProject = actionCreator.async<CreateProjectType, IProject>(
  projectActions.CREATE_PROJECT
);

export const fetchDeleteProject = actionCreator.async<
  number,
  IDeleteProjectResponse
>(projectActions.DELETE_PROJECTS);
