import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchCreateProject,
  fetchDeleteProject,
  deleteProjectAllow,
  deleteProjectCancel,
  editProject,
  editProjectCancel,
  fetchProjects,
  fetchEditProject
} from '../actions';
import { ProjectNormalized, IProjectState } from '../types';
import { allowEditProjectHandler, cancelEditProjectHandler, fetchEditProjectSuccess } from './handlers';
import { projectListSchema } from './normalize';


export const initialState: IProjectState = {
  projectDeleting: -1,
  projectEditing: -1,
  projects: {},
  projectIds: []
};

const projectReducer = reducerWithInitialState(initialState)
  .case(
    fetchProjects.done,
    (state, payload): IProjectState => {
      const normalizedData = normalize(payload.result, projectListSchema);
      const projects: ProjectNormalized | undefined =
        normalizedData.entities.projects;


      return {
        ...state,
        projectIds: normalizedData.result.sort((id1: number, id2: number) => id1 - id2),
        projects: projects ? projects : state.projects
      };
    })
  .case(fetchCreateProject.done, (state, payload): IProjectState => {
    const normalizedData = normalize([payload.result], projectListSchema);

    const projects: ProjectNormalized | undefined =
      normalizedData.entities.projects;
    const projectIds = [...state.projectIds, ...normalizedData.result].sort((id1, id2) => id1 - id2)
    return {
      ...state,
      projectIds,
      projects: projects
        ? {
          ...state.projects,
          ...projects
        }
        : state.projects
    };
  })
  .case(fetchDeleteProject.done, (state, payload): IProjectState => {
    if (payload.result.success) {
      let projectIds = [...state.projectIds];
      const deleteId = payload.result.deletedProject!.id;

      projectIds = projectIds.filter((id) => id !== deleteId).sort((id1, id2) => id1 > id2 ? 1 : -1);
      const projects = { ...state.projects };

      delete projects[deleteId]
      return {
        ...state,
        projectDeleting: -1,
        projectIds,
        projects,
      };
    }
    return {
      ...state,
      projectDeleting: -1
    };
  })
  .case(
    fetchEditProject.done,
    fetchEditProjectSuccess
  )
  .case(
    deleteProjectAllow,
    (state, payload) => {
      return {
        ...state,
        projectDeleting: payload.id
      }
    }
  )
  .case(
    deleteProjectCancel,
    (state, payload) => {
      return {
        ...state,
        projectDeleting: -1
      }
    }
  )
  .case(
    editProject,
    allowEditProjectHandler
  )
  .case(
    editProjectCancel,
    cancelEditProjectHandler
  );

export default projectReducer;
