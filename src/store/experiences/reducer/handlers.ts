import { IExperienceState } from "../types";

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