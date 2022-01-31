import { ITechnology } from "../technologies/types";

export enum ProjectTypes {
  WEB_SERVICE = 'Web Service',
  WEB_SITE = 'Web Site',
  CRM = 'CRM System'
}

export type ImageUploadedType = {
  id: number,
  url: string,
  name: string,
  size: number
}
export interface IProject {
  id: number,
  name: string,
  description?: string
  link?: string,
  type: ProjectTypes,
  photos: ImageUploadedType[],
  country?: string,
  technologies: ITechnology[]
}

export type ProjectTableRowType = Omit<IProject, "description" | "link" | "photos"> 
export type CreateProjectType = Omit<IProject, "id" | "technologies" | "photos"> & {
  technologies: number[]
  photos: number[]
}

export type UpdateProjectType = CreateProjectType & {
  id: number
}

export type ProjectNormalized = {
  [key: string]: IProject;
};


export interface IProjectState {
  projectDeleting: number,
  projectEditing: number,
  projects: ProjectNormalized,
  projectIds: number[],
  isFetchedProjects: boolean,
}


export interface IDeleteProjectResponse {
  success: boolean;
  deletedProject?: IProject;
}
