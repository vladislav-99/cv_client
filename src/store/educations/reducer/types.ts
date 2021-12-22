export interface IEducation {
    id: number,
    name: string
}

export interface IEducationState {
    pending: boolean,
    error: string | null,
    educations: IEducation[]
}