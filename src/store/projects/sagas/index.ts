import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import projectApiService from '../../../libs/api/projectApiService';
import { fetchProjects, fetchCreateProject, fetchDeleteProject, fetchEditProject, fetchProjectById } from '../actions';
import { CreateProjectType, IDeleteProjectResponse, IProject, UpdateProjectType } from '../types';

const fetchProjectsWorker = bindAsyncAction(fetchProjects, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<IProject[]> = yield call(projectApiService.getAll);
  return response.data;
});

const createProjectsWorker = bindAsyncAction(fetchCreateProject, {
  skipStartedAction: true
})(function* (project): SagaIterator {
  const response: AxiosResponse<IProject[]> = yield call(
    projectApiService.create,
    project
  );
  return response.data;
});

const editProjectsWorker = bindAsyncAction(fetchEditProject, {
  skipStartedAction: true
})(function* (project): SagaIterator {
  const response: AxiosResponse<IProject[]> = yield call(
    projectApiService.edit,
    project
  );
  return response.data;
});

const deleteProjectWorker = bindAsyncAction(fetchDeleteProject, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IDeleteProjectResponse> = yield call(
    projectApiService.delete,
    id
  );
  return response.data;
});


const fetchProjectWorker = bindAsyncAction(fetchProjectById, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IProject[]> = yield call(
    projectApiService.getById,
    id
  );
  return response.data;
});

// watchers

export function* watchProjectsRequest() {
  yield takeLatest(fetchProjects.started, fetchProjectsWorker);
}

export function* watchGetProjectRequest() {
  yield takeLatest(fetchProjectById.started, (action: Action<number>) => {
    return fetchProjectWorker(action.payload);
  });
}

export function* watchAddProjectRequest() {
  yield takeLatest(fetchCreateProject.started, (action: Action<CreateProjectType>) => {
    return createProjectsWorker(action.payload);
  });
}

export function* watchEditProjectRequest() {
  yield takeLatest(fetchEditProject.started, (action: Action<UpdateProjectType>) => {
    return editProjectsWorker(action.payload);
  });
}

export function* watchDeleteProjectRequest() {
  yield takeLatest(fetchDeleteProject.started, (action: Action<number>) => {
    return deleteProjectWorker(action.payload);
  });
}