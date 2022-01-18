import { Success } from "typescript-fsa";
import { IProject, IProjectState } from "../types";

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
  payload: Success<IProject, IProject>
): IProjectState => {
  const {
    id
  } = payload.result;

  const projects = { ...state.projects };

  projects[id] = payload.result

  return {
    ...state,
    projects,
    projectEditing: -1
  };

}