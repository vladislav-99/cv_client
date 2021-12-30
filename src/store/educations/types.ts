
export interface IEducation {
  id: number;
  name: string;
}

export type EducationNormalized = {
  [key: string]: IEducation;
};


export interface IEducationState {
  educations: EducationNormalized;
  educationIds: number[]
}


export interface IDeleteEducationResponse {
  success: boolean;
  deletedEducation?: IEducation;
}
