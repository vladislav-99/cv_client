import http from "./index";
import {
  IDeleteUserResponse,
  IUser,
  CreateUserType,
  UpdateUserType
} from '../../store/users/types';

class UserApiService {

  create(user: CreateUserType) {
    return http.post<IUser>(
      `/users`,
      user
    );
  }

  getAll() {
    return http.get<IUser[]>('/users')
  }

  getById(id: number) {
    return http.get<IUser>(`/users/${id}`)
  }

  delete(id: number) {
    return http.delete<IDeleteUserResponse>(`/users/${id}`)
  }

  edit({id, ...user}: UpdateUserType) {
    return http.patch<IUser>(`/users/${id}`, user)
  }
}

export default new UserApiService()