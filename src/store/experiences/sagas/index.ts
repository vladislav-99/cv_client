import axios, { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, takeLatest } from "redux-saga/effects";
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { fetchExperiences } from "../actions";

import { IExperience } from "../reducer";


const getExperiences = () =>
  axios.get<IExperience[]>(`${process.env.REACT_APP_CV_API}/experiences`);


const fetchExperiencesWorker = bindAsyncAction(fetchExperiences, { skipStartedAction: true })(
  function* (): SagaIterator {
    const response: AxiosResponse<IExperience[]> = yield call(getExperiences);
    return response.data
  }
);


export function* watchExperiencesRequest() {
  yield takeLatest(fetchExperiences.started, fetchExperiencesWorker);
}