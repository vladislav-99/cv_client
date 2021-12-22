import { IEducation } from "../reducer/types";


export enum educationActions {
    FETCH_EDUCATIONS_REQUEST = "FETCH_EDUCATIONS_REQUEST",
    FETCH_EDUCATIONS_SUCCESS = "FETCH_EDUCATIONS_SUCCESS",
    FETCH_EDUCATIONS_FAILURE = "FETCH_EDUCATIONS_FAILURE",
}

export interface FetchEducationsSuccessPayload {
    educations: IEducation[];
}

export interface FetchEducationsFailurePayload {
    error: string;
}

export interface fetchEducationsRequestt {
    type: educationActions.FETCH_EDUCATIONS_REQUEST;
}

export type FetchEducationsSuccess = {
    type: educationActions.FETCH_EDUCATIONS_SUCCESS;

    payload: FetchEducationsSuccessPayload;
};

export type FetchEducationsFailure = {
    type: educationActions.FETCH_EDUCATIONS_FAILURE;
    payload: FetchEducationsFailurePayload;
};

export type EducationActions =
    | fetchEducationsRequestt
    | FetchEducationsSuccess
    | FetchEducationsFailure;