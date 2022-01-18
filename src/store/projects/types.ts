
export enum ProjectTypes {
  WEB_SERVICE = 'Web Service',
  WEB_SITE = 'Web Site',
  CRM = 'CRM system'
}
export interface IProject {
  id: 1,
  name: string,
  description?: string
  link?: string,
  type: ProjectTypes,
  photos?: string[],
  country?: string,
  technologies: string[]

}

export type ProjectTableRowType = Omit<IProject, "description" | "link" | "photos">
export type CreateProjectType = Omit<IProject, "id">

export type ProjectNormalized = {
  [key: string]: IProject;
};


export interface IProjectState {
  projectDeleting: number
  projectEditing: number
  projects: ProjectNormalized;
  projectIds: number[]
}


export interface IDeleteProjectResponse {
  success: boolean;
  deletedProject?: IProject;
}
