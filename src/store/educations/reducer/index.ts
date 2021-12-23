import { reducerWithInitialState } from "typescript-fsa-reducers";
import { fetchEducations } from "../actions";

export interface IEducation {
    id: number,
    name: string
}

export interface IEducationState {
    educations: IEducation[]
}

export const initialState: IEducationState = {
    educations: []
};

const educationReducer = reducerWithInitialState(initialState)
    .case(fetchEducations.done, (state, payload): IEducationState => {
        return {
            ...state,
            educations: payload.result
        }
    })

export default educationReducer