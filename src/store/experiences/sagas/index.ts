import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IExperience } from '../reducer/types'
import { experienceActions } from '../actions/types'
import {
    fetchExperiencesFailure,
    fetchExperiencesSuccess
} from "../actions";


const getExperiences = () =>
    axios.get<IExperience[]>("http://localhost:3001/api/experiences");

function* fetchExperiencesSaga() {
    try {
        const response: AxiosResponse<IExperience[]> = yield call(getExperiences);
        yield put(
            fetchExperiencesSuccess({
                experiences: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchExperiencesFailure({
                error: (e as Error).message
            })
        );
    }
}

function* experiencesWatchersSaga() {
    yield all([takeLatest(experienceActions.FETCH_EXPERIENCES_REQUEST, fetchExperiencesSaga)]);
}

export default experiencesWatchersSaga;
