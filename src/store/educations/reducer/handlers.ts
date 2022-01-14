import { IEducationState } from "../types";

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