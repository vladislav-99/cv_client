import { normalize, schema } from 'normalizr';
import { IExperience } from '.';

 const experienceSchema = new schema.Entity<IExperience>('experiences');



 export const experienceListSchema = [experienceSchema]