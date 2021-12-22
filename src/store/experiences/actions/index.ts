import {
    experienceActions,
    FetchExperiencesFailure,
    FetchExperiencesFailurePayload,
    fetchExperiencesRequestt,
    FetchExperiencesSuccess,
    FetchExperiencesSuccessPayload
} from './types';



export const fetchExperiencesRequest = (): fetchExperiencesRequestt => ({
    type: experienceActions.FETCH_EXPERIENCES_REQUEST
})

export const fetchExperiencesSuccess = (
    payload: FetchExperiencesSuccessPayload
): FetchExperiencesSuccess => ({
    type: experienceActions.FETCH_EXPERIENCES_SUCCESS,
    payload
})

export const fetchExperiencesFailure = (
    payload: FetchExperiencesFailurePayload
): FetchExperiencesFailure => ({
    type: experienceActions.FETCH_EXPERIENCES_FAILURE,
    payload
})