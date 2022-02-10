import {
  educationsColumns,
  experienceColumns,
  projectColumns
} from './columns';

export enum Tables {
  projects,
  users,
  educations,
  experiences
}

export const getColumns = (table: Tables) => {
  switch (table) {
    case Tables.educations:
      return educationsColumns;

    case Tables.experiences:
      return experienceColumns;
      
    case Tables.projects:
      return projectColumns;

    default:
      return [];
  }
};
