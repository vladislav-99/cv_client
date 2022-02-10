import { ITechnology } from '../technologies/types';
import { IExperience } from '../experiences/types';
import { IEducation } from '../educations/types';

export type ImageUploadedType = {
  id: number,
  url: string,
  name: string,
  size: number
}

export interface IUser {
  id: number,
  name: string,
  photo?: string
  description?: string,
  sphere?: string,
  technologies: ITechnology[],
  experiences: IExperience[],
  educations: IEducation[],
}

export type UserTableRowType = Pick<IUser, 'id' | 'name' | 'description' | 'photo'>
export type CreateUserType = Omit<IUser, 'id' | 'technologies' | 'experiences' | 'educations'> & {
  technologies: number[]
  experiences: number[]
  educations: number[]
}

export type UpdateUserType = CreateUserType & {
  id: number
}

export type UserNormalized = {
  [key: string]: IUser;
};


export interface IUserState {
  userDeleting: number,
  userEditing: number,
  users: UserNormalized,
  userIds: number[],
  isFetchedUsers: boolean,
}


export interface IDeleteUserResponse {
  success: boolean;
  deletedUser?: IUser;
}
