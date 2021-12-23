import { IEducation } from '../reducer';
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export enum educationActions {
    FETCH_EDUCATIONS = "FETCH_EDUCATIONS",
}

export const fetchEducations = actionCreator.async<void, IEducation[]>(educationActions.FETCH_EDUCATIONS)