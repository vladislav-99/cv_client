import {
  educationsColumns,
  experienceColumns,
  projectColumns
} from './columns';

export enum Tables {
  projects,
  users,
  educations,
  experioences
}

export const getColumns = (table: Tables) => {
  switch (table) {
    case Tables.educations:
      return educationsColumns;

    case Tables.experioences:
      return experienceColumns;
      
    case Tables.projects:
      return projectColumns;

    default:
      return [];
  }
};
