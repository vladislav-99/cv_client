export interface IExperience {
    id: number,
    name: string
}

export interface IExperienceState {
    pending: boolean,
    error: string | null,
    experiences: IExperience[]
}