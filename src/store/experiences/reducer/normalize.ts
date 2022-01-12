import { schema } from 'normalizr';
import { IExperience } from '../types';

const experienceSchema = new schema.Entity<IExperience>('experiences');

export const experienceListSchema = [experienceSchema];
