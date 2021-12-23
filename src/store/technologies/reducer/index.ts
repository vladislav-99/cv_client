import { reducerWithInitialState } from "typescript-fsa-reducers";
import { fetchTechnologies } from '../actions';

export enum TechnologyTypes {
  SOFT = 'Soft skills',
  FRONT_END = 'Front-end',
  BACK_END = 'Back-end',
  DB = 'Databases',
  HOSTING = 'Hosting',
  OTHER = 'Other',
}


export interface ITechnology {
  id: number,
  name: string
  type: TechnologyTypes
}
export type TehnologiesType = {
  [key in TechnologyTypes]?: ITechnology[]
}

export interface ITechnologiesState {
  technologyCounts: number,
  technologies: TehnologiesType
}


const initialState: ITechnologiesState = {
  technologyCounts: 0,
  technologies: {}
}

const educationReducer = reducerWithInitialState(initialState)
  .case(fetchTechnologies.done, (state, payload): ITechnologiesState => {

    let counts = 0;
    const technologies = payload.result.reduce((prev, cur) => {
      let technologiesList: ITechnology[] | undefined = []
      if (prev && prev[cur.type]) technologiesList = prev[cur.type]
      counts++
      return {
        ...prev,
        [cur.type]: technologiesList ? [cur, ...technologiesList] : [cur]
      }

    }, {} as TehnologiesType)

    return {
      ...state,
      technologies,
      technologyCounts: counts
    }
  })

export default educationReducer