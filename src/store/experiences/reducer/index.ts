import { ExperienceActions, experienceActions } from '../actions/types';
import { IExperienceState } from './types';

const initialState: IExperienceState = {
    pending: false,
    error: null,
    experiences: []
}

const experiencesReducer = (state = initialState, action: ExperienceActions): IExperienceState => {
    switch (action.type) {
        case experienceActions.FETCH_EXPERIENCES_REQUEST: {
            return {
                ...state,
                pending: true
            }
        }
        case experienceActions.FETCH_EXPERIENCES_SUCCESS: {
            return {
                ...state,
                experiences: action.payload.experiences,
                pending: false,
                error: null
            }
        }
        case experienceActions.FETCH_EXPERIENCES_FAILURE: {
            return {
                ...state,
                experiences: [],
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

export default experiencesReducer