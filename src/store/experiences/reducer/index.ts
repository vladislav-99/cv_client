import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  createExperiences,
  fetchExperiences,
  deleteExperience
} from '../actions';
import { ExperienceNormalized, IExperienceState } from '../types';
import { experienceListSchema } from './normalize';

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
    const experiencesIds = [...state.experiencesIds, ...normalizedData.result].sort((id1, id2) => id1 > id2 ? 1 : -1)
    return {
      ...state,
      experiencesIds,
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

      experiencesIds = experiencesIds.filter((id) => id !== deleteId).sort((id1, id2) => id1 > id2 ? 1 : -1);
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
