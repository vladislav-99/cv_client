import { Success } from 'typescript-fsa';
import {
  CreateUserType,
  IUser,
  IUserState
} from '../types';


const updateUser = (
  state: IUserState,
  user: IUser
): IUserState => {
  const {
    id
  } = user;

  const users = { ...state.users };

  users[id] = user;

  return {
    ...state,
    users
  };
};

export const allowEditUserHandler = (
  state: IUserState,
  payload: { id: number }
) => {
  return {
    ...state,
    userEditing: payload.id
  };
};

export const cancelEditUserHandler = (
  state: IUserState,
  _payload: void
) => {
  return {
    ...state,
    userEditing: -1
  };
};

export const fetchEditUserSuccess = (
  state: IUserState,
  payload: Success<CreateUserType, IUser>
): IUserState => {
  return {
    ...updateUser(state, payload.result),
    userEditing: -1
  };

};

export const fetchUserSuccess = (
  state: IUserState,
  payload: Success<number, IUser>
): IUserState => {
  return updateUser(state, payload.result);
};