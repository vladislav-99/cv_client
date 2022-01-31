import { Success } from "typescript-fsa";
import { CreateProjectType, IProject, IProjectState } from '../types';


const updateProject = (
  state: IProjectState,
  project: IProject
): IProjectState => {
  const {
    id
  } = project;

  const projects = { ...state.projects };

  projects[id] = project

  return {
    ...state,
    projects
  }
}

export const allowEditProjectHandler = (
  state: IProjectState,
  payload: { id: number }
) => {
  return {
    ...state,
    projectEditing: payload.id
  }
}

export const cancelEditProjectHandler = (
  state: IProjectState,
  payload: void
) => {
  return {
    ...state,
    projectEditing: -1
  }
}

export const fetchEditProjectSuccess = (
  state: IProjectState,
  payload: Success<CreateProjectType, IProject>
): IProjectState => {
  return {
    ...updateProject(state, payload.result),
    projectEditing: -1
  };

}

export const fetchProjectSuccess = (
  state: IProjectState,
  payload: Success<number, IProject>
): IProjectState => {
  return updateProject(state, payload.result)
};