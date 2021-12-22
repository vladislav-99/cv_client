import {
    educationActions,
    FetchEducationsFailure,
    FetchEducationsFailurePayload,
    fetchEducationsRequestt,
    FetchEducationsSuccess,
    FetchEducationsSuccessPayload
} from './types';



export const fetchEducationsRequest = (): fetchEducationsRequestt => ({
    type: educationActions.FETCH_EDUCATIONS_REQUEST
})

export const fetchEducationsSuccess = (
    payload: FetchEducationsSuccessPayload
): FetchEducationsSuccess => ({
    type: educationActions.FETCH_EDUCATIONS_SUCCESS,
    payload
})

export const fetchEducationsFailure = (
    payload: FetchEducationsFailurePayload
): FetchEducationsFailure => ({
    type: educationActions.FETCH_EDUCATIONS_FAILURE,
    payload
})