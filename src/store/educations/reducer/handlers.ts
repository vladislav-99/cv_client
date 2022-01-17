import { Success } from "typescript-fsa";
import { IEducation, IEducationState } from "../types";

export const allowEditEducationHandler = (
  state: IEducationState,
  payload: { id: number }
) => {
  return {
    ...state,
    educationEditing: payload.id
  }
}

export const cancelEditEducationHandler = (
  state: IEducationState,
  payload: void
) => {
  return {
    ...state,
    educationEditing: -1
  }
}

export const fetchEditEducationSuccess = (
  state: IEducationState,
  payload: Success<IEducation, IEducation>
): IEducationState => {
  const {
    id
  } = payload.result;

  const educations = { ...state.educations };

  educations[id] = payload.result

  return {
    ...state,
    educations,
    educationEditing: -1
  };

}