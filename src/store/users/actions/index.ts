import actionCreatorFactory from 'typescript-fsa';
import {
  IUser,
  IDeleteUserResponse,
  CreateUserType,
  UpdateUserType
} from '../types';

const actionCreator = actionCreatorFactory();

export enum userActions {
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USER = 'FETCH_USER',
  FETCH_EDIT_USER = 'FETCH_EDIT_USER',
  CREATE_USER = 'CREATE_USER',
  DELETE_USERS = 'DELETE_USERS',
  DELETE_USER_ALLOW = 'DELETE_USER_ALLOW',
  DELETE_USER_CANCEL = 'DELETE_USER_CANCEL',
  EDIT_USER = 'EDIT_USER',
  EDIT_USER_CANCEL = 'EDIT_USER_CANCEL'
}

export const deleteUserAllow = actionCreator<{ id: number }>(
  userActions.DELETE_USER_ALLOW
);

export const deleteUserCancel = actionCreator(
  userActions.DELETE_USER_CANCEL
);

export const editUser = actionCreator<{ id: number }>(
  userActions.EDIT_USER
);

export const editUserCancel = actionCreator(
  userActions.EDIT_USER_CANCEL
);

export const fetchUsers = actionCreator.async<void, IUser[]>(
  userActions.FETCH_USERS
);

export const fetchUserById = actionCreator.async<number, IUser>(
  userActions.FETCH_USER
);

export const fetchEditUser = actionCreator.async<UpdateUserType, IUser>(
  userActions.FETCH_EDIT_USER
);

export const fetchCreateUser = actionCreator.async<CreateUserType, IUser>(
  userActions.CREATE_USER
);

export const fetchDeleteUser = actionCreator.async<number,
  IDeleteUserResponse>(userActions.DELETE_USERS);
