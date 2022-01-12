import { schema } from 'normalizr';
import { IEducation } from '../types';

const educationSchema = new schema.Entity<IEducation>('educations');

export const educationListSchema = [educationSchema];
