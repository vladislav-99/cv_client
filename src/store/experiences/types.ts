export interface IExperience {
  id: number;
  name: string;
}

export type ExperienceNormalized = {
  [key: string]: IExperience;
};

export interface IExperienceState {
  pending: boolean;
  error: string | null;
  experienceDeleting: number;
  experiencesIds: number[];
  experiences: ExperienceNormalized;
}


export interface IDeleteExperienceResponse {
  success: boolean;
  deletedExperience?: IExperience;
}
