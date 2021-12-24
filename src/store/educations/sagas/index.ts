import axios, { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { fetchEducations } from '../actions';

import { IEducation } from '../reducer';

const getEducations = () =>
  axios.get<IEducation[]>(`${process.env.REACT_APP_CV_API}/educations`);

const fetchEducationsWorker = bindAsyncAction(fetchEducations, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<IEducation[]> = yield call(getEducations);
  return response.data;
});

export function* watchEducationsRequest() {
  yield takeLatest(fetchEducations.started, fetchEducationsWorker);
}
