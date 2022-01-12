import { schema } from 'normalizr';
import { ITechnology } from '../types';

const technologySchema = new schema.Entity<ITechnology>('technologies');

export const technologyListSchema = [technologySchema];
