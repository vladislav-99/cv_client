import { schema } from 'normalizr';
import { IProject } from '../types';

const projectSchema = new schema.Entity<IProject>('projects');

export const projectListSchema = [projectSchema];
