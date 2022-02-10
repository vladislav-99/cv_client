import { schema } from 'normalizr';
import { IUser } from '../types';

const userSchema = new schema.Entity<IUser>('users');

export const userListSchema = [userSchema];
