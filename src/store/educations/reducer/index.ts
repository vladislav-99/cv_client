import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createEducations, deleteEducation, deleteEducationAllow, deleteEducationCancel, fetchEducations } from '../actions';
import { EducationNormalized, IEducationState } from '../types';
import { educationListSchema } from './normalize';


export const initialState: IEducationState = {
  educationDeleting: -1,
  educations: {},
  educationIds: []
};

const educationReducer = reducerWithInitialState(initialState)
  .case(
    fetchEducations.done,
    (state, payload): IEducationState => {
      const normalizedData = normalize(payload.result, educationListSchema);
      const educations: EducationNormalized | undefined =
        normalizedData.entities.educations;


      return {
        ...state,
        educationIds: normalizedData.result,
        educations: educations ? educations : state.educations
      };
    })
  .case(createEducations.done, (state, payload): IEducationState => {
    const normalizedData = normalize(payload.result, educationListSchema);

    const educations: EducationNormalized | undefined =
      normalizedData.entities.educations;
    const educationIds = [...state.educationIds, ...normalizedData.result].sort((id1, id2) => id1 > id2 ? 1 : -1)
    return {
      ...state,
      educationIds,
      educations: educations
        ? {
          ...state.educations,
          ...educations
        }
        : state.educations
    };
  })
  .case(deleteEducation.done, (state, payload): IEducationState => {
    if (payload.result.success) {
      let educationIds = [...state.educationIds];
      const deleteId = payload.result.deletedEducation!.id;

      educationIds = educationIds.filter((id) => id !== deleteId).sort((id1, id2) => id1 > id2 ? 1 : -1);
      const educations = { ...state.educations };

      delete educations[deleteId]
      return {
        ...state,
        educationDeleting: -1,
        educationIds,
        educations,
      };
    }
    return {
      ...state,
      educationDeleting: -1
    };
  })
  .case(
    deleteEducationAllow,
    (state, payload)=> {
      return {
        ...state,
        educationDeleting: payload.id
      }
    }
  )
  .case(
    deleteEducationCancel,
    (state, payload)=> {
      return {
        ...state,
        educationDeleting: -1
      }
    }
  );

export default educationReducer;
