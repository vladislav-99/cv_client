import axios, { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { fetchTechnologies } from '../actions';

import { ITechnology } from '../reducer';

const getTecnologies = () =>
  axios.get<ITechnology[]>(`${process.env.REACT_APP_CV_API}/technologies`);

const fetchTecnologiesWorker = bindAsyncAction(fetchTechnologies, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<ITechnology[]> = yield call(getTecnologies);
  return response.data;
});

export function* watchTecnologiesRequest() {
  yield takeLatest(fetchTechnologies.started, fetchTecnologiesWorker);
}
