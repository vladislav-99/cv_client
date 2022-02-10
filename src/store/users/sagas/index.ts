import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import userApiService from '../../../libs/api/userApiService';
import { fetchUsers, fetchCreateUser, fetchDeleteUser, fetchEditUser, fetchUserById } from '../actions';
import { CreateUserType, IDeleteUserResponse, IUser, UpdateUserType } from '../types';

const fetchUsersWorker = bindAsyncAction(fetchUsers, {
  skipStartedAction: true
})(function* (): SagaIterator {
  const response: AxiosResponse<IUser[]> = yield call(userApiService.getAll);
  return response.data;
});

const createUsersWorker = bindAsyncAction(fetchCreateUser, {
  skipStartedAction: true
})(function* (user): SagaIterator {
  const response: AxiosResponse<IUser[]> = yield call(
    userApiService.create,
    user
  );
  return response.data;
});

const editUsersWorker = bindAsyncAction(fetchEditUser, {
  skipStartedAction: true
})(function* (user): SagaIterator {
  const response: AxiosResponse<IUser[]> = yield call(
    userApiService.edit,
    user
  );
  return response.data;
});

const deleteUserWorker = bindAsyncAction(fetchDeleteUser, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IDeleteUserResponse> = yield call(
    userApiService.delete,
    id
  );
  return response.data;
});


const fetchUserWorker = bindAsyncAction(fetchUserById, {
  skipStartedAction: true
})(function* (id): SagaIterator {
  const response: AxiosResponse<IUser[]> = yield call(
    userApiService.getById,
    id
  );
  return response.data;
});

// watchers

export function* watchUsersRequest() {
  yield takeLatest(fetchUsers.started, fetchUsersWorker);
}

export function* watchGetUserRequest() {
  yield takeLatest(fetchUserById.started, (action: Action<number>) => {
    return fetchUserWorker(action.payload);
  });
}

export function* watchAddUserRequest() {
  yield takeLatest(fetchCreateUser.started, (action: Action<CreateUserType>) => {
    return createUsersWorker(action.payload);
  });
}

export function* watchEditUserRequest() {
  yield takeLatest(fetchEditUser.started, (action: Action<UpdateUserType>) => {
    return editUsersWorker(action.payload);
  });
}

export function* watchDeleteUserRequest() {
  yield takeLatest(fetchDeleteUser.started, (action: Action<number>) => {
    return deleteUserWorker(action.payload);
  });
}