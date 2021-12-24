import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  createExperiences,
  fetchExperiences,
  deleteExperience
} from '../actions';
import { experienceListSchema } from './normalize';
export interface IExperience {
  id: number;
  name: string;
}

type ExperienceNormalized = {
  [key: string]: IExperience;
};

export interface IExperienceState {
  pending: boolean;
  error: string | null;
  experiencesIds: number[];
  experiences: ExperienceNormalized;
}

const initialState: IExperienceState = {
  pending: false,
  error: null,
  experiencesIds: [],
  experiences: {}
};

const educationReducer = reducerWithInitialState(initialState)
  .case(fetchExperiences.done, (state, payload): IExperienceState => {
    const normalizedData = normalize(payload.result, experienceListSchema);
    const experiences: ExperienceNormalized | undefined =
      normalizedData.entities.experiences;

    return {
      ...state,
      experiencesIds: normalizedData.result,
      experiences: experiences ? experiences : state.experiences
    };
  })
  .case(createExperiences.done, (state, payload): IExperienceState => {
    const normalizedData = normalize(payload.result, experienceListSchema);
    const experiences: ExperienceNormalized | undefined =
      normalizedData.entities.experiences;

    return {
      ...state,
      experiencesIds: [...state.experiencesIds, ...normalizedData.result],
      experiences: experiences
        ? {
          ...state.experiences,
          ...experiences
        }
        : state.experiences
    };
  })
  .case(deleteExperience.done, (state, payload): IExperienceState => {
    if (payload.result.success) {
      let experiencesIds = [...state.experiencesIds];
      const deleteId = payload.result.deletedExperience!.id;

      experiencesIds = experiencesIds.filter((id) => id !== deleteId);
      const experiences = { ...state.experiences };

      delete experiences[deleteId]
      return {
        ...state,
        experiencesIds,
        experiences
      };
    }
    return {
      ...state
    };
  });
export default educationReducer;
