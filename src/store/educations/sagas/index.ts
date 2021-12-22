import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IEducation } from '../reducer/types'
import { educationActions } from '../actions/types'
import {
    fetchEducationsFailure,
    fetchEducationsSuccess
} from "../actions";


const getEducations = () =>
    axios.get<IEducation[]>(`${process.env.REACT_APP_CV_API}/educations`);

function* fetchEducationSaga() {
    try {
        const response: AxiosResponse<IEducation[]> = yield call(getEducations);
        yield put(
            fetchEducationsSuccess({
                educations: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchEducationsFailure({
                error: (e as Error).message
            })
        );
    }
}

function* educatiunWatchersSaga() {
    yield all([takeLatest(educationActions.FETCH_EDUCATIONS_REQUEST, fetchEducationSaga)]);
}

export default educatiunWatchersSaga;
