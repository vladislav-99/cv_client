import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import educationApiService from '../../../libs/api/educationApiService';
import { fetchEducations, createEducations, deleteEducation } from '../actions';

import { IDeleteEducationResponse, IEducation } from '../types';

const fetchEducationsWorker = bindAsyncAction(fetchEducations, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<IEducation[]> = yield call(educationApiService.getAll);
  return response.data;
});

const createEducationsWorker = bindAsyncAction(createEducations, {
  skipStartedAction: true
})(function* (experiences): SagaIterator {
  const response: AxiosResponse<IEducation[]> = yield call(
    educationApiService.createMany,
    experiences
  );
  return response.data;
});

const deleteEducationWorker = bindAsyncAction(deleteEducation, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IDeleteEducationResponse> = yield call(
    educationApiService.delete,
    id
  );
  return response.data;
});

export function* watchEducationsRequest() {
  yield takeLatest(fetchEducations.started, fetchEducationsWorker);
}

export function* watchAddEducationsRequest() {
  yield takeLatest(createEducations.started, (action: Action<string[]>) => {
    return createEducationsWorker(action.payload);
  });
}

export function* watchDeleteEducationRequest() {
  yield takeLatest(deleteEducation.started, (action: Action<number>) => {
    return deleteEducationWorker(action.payload);
  });
}