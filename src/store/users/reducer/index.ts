import { normalize } from 'normalizr';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchCreateUser,
  fetchDeleteUser,
  deleteUserAllow,
  deleteUserCancel,
  editUser,
  editUserCancel,
  fetchUsers,
  fetchEditUser,
  fetchUserById
} from '../actions';
import { UserNormalized, IUserState } from '../types';
import {
  allowEditUserHandler,
  cancelEditUserHandler,
  fetchEditUserSuccess,
  fetchUserSuccess
} from './handlers';
import { userListSchema } from './normalize';


export const initialState: IUserState = {
  isFetchedUsers: false,
  userDeleting: -1,
  userEditing: -1,
  users: {},
  userIds: []
};

const userReducer = reducerWithInitialState(initialState)
  .case(
    fetchUsers.done,
    (state, payload): IUserState => {
      const normalizedData = normalize(payload.result, userListSchema);
      const users: UserNormalized | undefined =
        normalizedData.entities.users;


      return {
        ...state,
        isFetchedUsers: true,
        userIds: normalizedData.result.sort((id1: number, id2: number) => id1 - id2),
        users: users ? users : state.users
      };
    })
  .case(fetchCreateUser.done, (state, payload): IUserState => {
    const normalizedData = normalize([payload.result], userListSchema);

    const users: UserNormalized | undefined =
      normalizedData.entities.users;
    const userIds = [...state.userIds, ...normalizedData.result].sort((id1, id2) => id1 - id2);
    return {
      ...state,
      userIds,
      users: users
        ? {
          ...state.users,
          ...users
        }
        : state.users
    };
  })
  .case(fetchDeleteUser.done, (state, payload): IUserState => {
    if (payload.result.success) {
      let userIds = [...state.userIds];
      const deleteId = payload.result.deletedUser!.id;

      userIds = userIds.filter((id) => id !== deleteId).sort((id1, id2) => id1 > id2 ? 1 : -1);
      const users = { ...state.users };

      delete users[deleteId];
      return {
        ...state,
        userDeleting: -1,
        userIds,
        users
      };
    }
    return {
      ...state,
      userDeleting: -1
    };
  })
  .case(
    fetchEditUser.done,
    fetchEditUserSuccess
  )
  .case(
    deleteUserAllow,
    (state, payload) => {
      return {
        ...state,
        userDeleting: payload.id
      };
    }
  )
  .case(
    deleteUserCancel,
    (state, _payload) => {
      return {
        ...state,
        userDeleting: -1
      };
    }
  )
  .case(
    editUser,
    allowEditUserHandler
  )
  .case(
    editUserCancel,
    cancelEditUserHandler
  )
  .case(
    fetchUserById.done,
    fetchUserSuccess
  );

export default userReducer;
