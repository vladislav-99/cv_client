import { EducationActions, educationActions } from '../actions/types';
import { IEducationState } from './types';

const initialState: IEducationState = {
    pending: false,
    error: null,
    educations: []
}
//TODO change any
const educationsReducer = (state = initialState, action: EducationActions): IEducationState => {
    switch (action.type) {
        case educationActions.FETCH_EDUCATIONS_REQUEST: {
            return {
                ...state,
                pending: true
            }
        }
        case educationActions.FETCH_EDUCATIONS_SUCCESS: {
            return {
                ...state,
                educations: action.payload.educations,
                pending: false,
                error: null
            }
        }
        case educationActions.FETCH_EDUCATIONS_FAILURE: {
            return {
                ...state,
                educations: [],
                pending: false,
                error: action.payload.error
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default educationsReducer