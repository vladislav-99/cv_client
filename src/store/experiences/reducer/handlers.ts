import { Success } from "typescript-fsa";
import { IExperience, IExperienceState } from "../types";

export const allowEditExperienceHandler = (
  state: IExperienceState,
  payload: { id: number }
): IExperienceState => {
  return {
    ...state,
    experienceEditing: payload.id
  }
}

export const cancelEditExperienceHandler = (
  state: IExperienceState,
  payload: void
): IExperienceState => {
  return {
    ...state,
    experienceEditing: -1
  }
}

export const fetchEditExperienceSuccess = (
  state: IExperienceState,
  payload: Success<IExperience, IExperience>
): IExperienceState => {
  const {
    id
  } = payload.result;

  const experiences = { ...state.experiences };

  experiences[id] = payload.result

  return {
    ...state,
    experiences,
    experienceEditing: -1
  };

}