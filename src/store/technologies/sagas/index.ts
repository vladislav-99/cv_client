import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import technologyApiService from '../../../libs/api/technologyApiService';
import { fetchTechnologies, createTechnologies, deleteTechnology, fetchEditTechnology } from '../actions';

import { CreatedTehnologyType, IDeleteTechnologyResponse, ITechnology, TechnologyTypes } from '../types';

const fetchTecnologiesWorker = bindAsyncAction(fetchTechnologies, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<ITechnology[]> = yield call(technologyApiService.getAll);
  return response.data;
});


const createTecnologiesWorker = bindAsyncAction(createTechnologies, {
  skipStartedAction: true
})(function* (technologies): SagaIterator {
  const response: AxiosResponse<ITechnology[]> = yield call(
    technologyApiService.createMany,
    technologies
  );
  return response.data;
});

const deleteTechnologyWorker = bindAsyncAction(deleteTechnology, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IDeleteTechnologyResponse> = yield call(
    technologyApiService.delete,
    id
  );
  return response.data;
});


const editTechnologyWorker = bindAsyncAction(fetchEditTechnology, {
  skipStartedAction: true
})(function* (technology): SagaIterator {
  const response: AxiosResponse<ITechnology[]> = yield call(
    technologyApiService.edit,
    technology
  );
  return response.data;
});

// watchers

export function* watchTecnologiesRequest() {
  yield takeLatest(fetchTechnologies.started, fetchTecnologiesWorker);
}

export function* watchAddTecnologiesRequest() {
  yield takeLatest(createTechnologies.started, (action: Action<CreatedTehnologyType[]>) => {
    return createTecnologiesWorker(action.payload);
  });
}

export function* watchDeleteTechnologyRequest() {
  yield takeLatest(deleteTechnology.started, (action: Action<number>) => {
    return deleteTechnologyWorker(action.payload);
  });
}

export function* watchEditTechnologyRequest() {
  yield takeLatest(fetchEditTechnology.started, (action: Action<ITechnology>) => {
    return editTechnologyWorker(action.payload);
  });
}