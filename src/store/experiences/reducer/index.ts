import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetchExperiences } from '../actions';
import { experienceListSchema } from './normalize';
export interface IExperience {
  id: number;
  name: string;
}

type ExperienceNormalized = {
  [key: string]: IExperience
}

export interface IExperienceState {
  pending: boolean;
  error: string | null;
  experiencesIds: number[];
  experiences: ExperienceNormalized
}

const initialState: IExperienceState = {
  pending: false,
  error: null,
  experiencesIds: [],
  experiences: {}
};

const educationReducer = reducerWithInitialState(initialState).case(
  fetchExperiences.done,
  (state, payload): IExperienceState => {
    const normalizedData = normalize(payload.result, experienceListSchema);
    const experiences: ExperienceNormalized | undefined = normalizedData.entities.experiences
    console.log(normalizedData)
    return {
      ...state,
      experiencesIds: normalizedData.result,
      experiences: experiences ? experiences : state.experiences
    };
  }
);

export default educationReducer;
