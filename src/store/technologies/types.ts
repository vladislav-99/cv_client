export enum TechnologyTypes {
  SOFT = 'Soft skills',
  FRONT_END = 'Front-end',
  BACK_END = 'Back-end',
  DB = 'Databases',
  HOSTING = 'Hosting',
  OTHER = 'Other'
}

export interface ITechnology {
  id: number;
  name: string;
  type: TechnologyTypes;
}

export type CreatedTehnologyType = Omit<ITechnology, "id">

export type TehnologiesType = {
  [key in TechnologyTypes]?: ITechnology[];
};

export type TechnbologiesNormalized = {
  [key: string]: ITechnology;
};


export interface ITechnologiesState {
  technologyDeleting: number;
  technologyEditing: number;
  technologyCounts: number;
  technologies: TechnbologiesNormalized;
  technologiesIds: number[]
  technologiesByTypes: {
    [key in TechnologyTypes]?: number[]
  }
}

export interface IDeleteTechnologyResponse {
  success: boolean;
  deletedTechnology?: ITechnology;
}
