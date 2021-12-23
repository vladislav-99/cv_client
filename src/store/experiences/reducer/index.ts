import { reducerWithInitialState } from "typescript-fsa-reducers";
import { fetchExperiences } from '../actions';
export interface IExperience {
  id: number,
  name: string
}

export interface IExperienceState {
  pending: boolean,
  error: string | null,
  experiences: IExperience[]
}


const initialState: IExperienceState = {
  pending: false,
  error: null,
  experiences: []
}

const educationReducer = reducerWithInitialState(initialState)
  .case(fetchExperiences.done, (state, payload): IExperienceState => {
    return {
      ...state,
      experiences: payload.result
    }
  })

export default educationReducer