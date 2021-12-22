import { IExperience } from "../reducer/types";


export enum experienceActions {
    FETCH_EXPERIENCES_REQUEST = "FETCH_EXPERIENCES_REQUEST",
    FETCH_EXPERIENCES_SUCCESS = "FETCH_EXPERIENCES_SUCCESS",
    FETCH_EXPERIENCES_FAILURE = "FETCH_EXPERIENCES_FAILURE",
}

export interface FetchExperiencesSuccessPayload {
    experiences: IExperience[];
}

export interface FetchExperiencesFailurePayload {
    error: string;
}

export interface fetchExperiencesRequestt {
    type: experienceActions.FETCH_EXPERIENCES_REQUEST;
}

export type FetchExperiencesSuccess = {
    type: experienceActions.FETCH_EXPERIENCES_SUCCESS;

    payload: FetchExperiencesSuccessPayload;
};

export type FetchExperiencesFailure = {
    type: experienceActions.FETCH_EXPERIENCES_FAILURE;
    payload: FetchExperiencesFailurePayload;
};

export type ExperienceActions =
    | fetchExperiencesRequestt
    | FetchExperiencesSuccess
    | FetchExperiencesFailure;