import axios, { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import experienceApiService from '../../../libs/api/experienceApiService';
import {
  fetchExperiences,
  fetchCreateExperiences,
  fetchDeleteExperience,
  fetchEditExperience
} from '../actions';

import { IExperience } from '../types';
import { IDeleteExperienceResponse } from '../types';

const getExperiences = () =>
  axios.get<IExperience[]>(`${process.env.REACT_APP_CV_API}/experiences`);

const deleteExperienceAxios = (id: number) =>
  axios.delete<IDeleteExperienceResponse>(
    `${process.env.REACT_APP_CV_API}/experiences/${id}`
  );

const addExperiences = (experiences: string[]) =>
  axios.post<IExperience[]>(
    `${process.env.REACT_APP_CV_API}/experiences/add-many`,
    {
      experiences
    }
  );

const fetchExperiencesWorker = bindAsyncAction(fetchExperiences, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<IExperience[]> = yield call(getExperiences);
  return response.data;
});

const editExperienceWorker = bindAsyncAction(fetchEditExperience, {
  skipStartedAction: true
})(function* (experience): SagaIterator {
  const response: AxiosResponse<IExperience[]> = yield call(
    experienceApiService.edit,
    experience
  );
  return response.data;
});

const createExperiencesWorker = bindAsyncAction(fetchCreateExperiences, {
  skipStartedAction: true
})(function* (experiences): SagaIterator {
  const response: AxiosResponse<IExperience[]> = yield call(
    addExperiences,
    experiences
  );
  return response.data;
});

const deleteExperienceWorker = bindAsyncAction(fetchDeleteExperience, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IDeleteExperienceResponse> = yield call(
    deleteExperienceAxios,
    id
  );
  return response.data;
});

export function* watchExperiencesRequest() {
  yield takeLatest(fetchExperiences.started, fetchExperiencesWorker);
}

export function* watchAddExperiencesRequest() {
  yield takeLatest(fetchCreateExperiences.started, (action: Action<string[]>) => {
    return createExperiencesWorker(action.payload);
  });
}


export function* watchEditExperienceRequest() {
  yield takeLatest(fetchEditExperience.started, (action: Action<IExperience>) => {
    return editExperienceWorker(action.payload);
  });
}

export function* watchDeleteExperienceRequest() {
  yield takeLatest(fetchDeleteExperience.started, (action: Action<number>) => {
    return deleteExperienceWorker(action.payload);
  });
}
