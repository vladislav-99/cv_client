import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchCreateExperiences,
  fetchExperiences,
  fetchDeleteExperience,
  deleteExperienceAllow,
  deleteExperienceCancel,
  editExperience,
  editExperienceCancel,
  fetchEditExperience
} from '../actions';
import { ExperienceNormalized, IExperienceState } from '../types';
import {
  allowEditExperienceHandler,
  cancelEditExperienceHandler,
  fetchEditExperienceSuccess
} from './handlers';
import { experienceListSchema } from './normalize';

const initialState: IExperienceState = {
  pending: false,
  error: null,
  experiencesIds: [],
  experiences: {},
  experienceDeleting: -1,
  experienceEditing: -1,
};

const experienceReducer = reducerWithInitialState(initialState)
  .case(fetchExperiences.done, (state, payload): IExperienceState => {
    const normalizedData = normalize(payload.result, experienceListSchema);
    const experiences: ExperienceNormalized | undefined =
      normalizedData.entities.experiences;

    return {
      ...state,
      experiencesIds: normalizedData.result.sort((id1: number, id2: number) => id1 - id2),
      experiences: experiences ? experiences : state.experiences
    };
  })
  .case(fetchCreateExperiences.done, (state, payload): IExperienceState => {
    const normalizedData = normalize(payload.result, experienceListSchema);
    const experiences: ExperienceNormalized | undefined =
      normalizedData.entities.experiences;
    const experiencesIds = [...state.experiencesIds, ...normalizedData.result].sort((id1: number, id2: number) => id1 - id2)
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
  .case(fetchDeleteExperience.done, (state, payload): IExperienceState => {
    if (payload.result.success) {
      let experiencesIds = [...state.experiencesIds];
      const deleteId = payload.result.deletedExperience!.id;

      experiencesIds = experiencesIds.filter((id) => id !== deleteId).sort((id1, id2) => id1 > id2 ? 1 : -1);
      const experiences = { ...state.experiences };

      delete experiences[deleteId]
      return {
        ...state,
        experiencesIds,
        experiences,
        experienceDeleting: -1
      };
    }
    return {
      ...state,
      experienceDeleting: -1
    };
  })
  .case(
    fetchEditExperience.done,
    fetchEditExperienceSuccess
  )
  .case(
    deleteExperienceAllow,
    (state, payload) => {
      return {
        ...state,
        experienceDeleting: payload.id
      }
    }
  )
  .case(
    deleteExperienceCancel,
    (state, payload) => {
      return {
        ...state,
        experienceDeleting: -1
      }
    }
  )
  .case(
    editExperience,
    allowEditExperienceHandler
  )
  .case(
    editExperienceCancel,
    cancelEditExperienceHandler
  );
export default experienceReducer;
