import { normalize } from "normalizr";
import { Success } from "typescript-fsa";
import { IDeleteTechnologyResponse, ITechnologiesState, ITechnology, TechnbologiesNormalized, TechnologyTypes } from "../types";
import { technologyListSchema } from "./normalize";


const getTechnologiesByTypes = (
  technologiesIds: number[],
  technologies: TechnbologiesNormalized,
  initialByTypes: {
    [key in TechnologyTypes]?: number[]
  } = {}
) => {
  technologiesIds.forEach(id => {
    const { type } = technologies[id];
    const ids = initialByTypes[type] || [];
    initialByTypes[type] = [...ids, id].sort((id1, id2) => id1 - id2)
  });

  return initialByTypes;
}

const getNormalized = (state: ITechnologiesState, data: ITechnology[]) => {
  const normalizedData = normalize(data, technologyListSchema);


  const technologies: TechnbologiesNormalized | undefined =
    normalizedData.entities.technologies;

  if (!technologies) return null

  const technologiesIds: number[] = normalizedData.result;

  const technologiesByTypes = getTechnologiesByTypes(
    technologiesIds,
    technologies,
    state.technologiesByTypes
  )


  return {
    technologies,
    technologiesIds,
    technologiesByTypes
  };
}


export const fetchHandlerSuccess =
  <PayloadParams>(
    state: ITechnologiesState,
    payload: Success<PayloadParams, ITechnology[]>
  ): ITechnologiesState => {
    const normalizedTechnologies = getNormalized(state, payload.result);

    if (!normalizedTechnologies) return state;

    const {
      technologies,
      technologiesIds,
      technologiesByTypes
    } = normalizedTechnologies;

    return {
      ...state,
      technologies: {
        ...state.technologies,
        ...technologies,
      },
      technologiesIds: [
        ...state.technologiesIds,
        ...technologiesIds
      ],
      technologiesByTypes
    };
  }

export const deleteHandlerSuccess = (
  state: ITechnologiesState,
  payload: Success<number, IDeleteTechnologyResponse>
): ITechnologiesState => {
  const { deletedTechnology } = payload.result;

  if (!deletedTechnology) return {
    ...state,
    technologyDeleting: -1
  };

  const { id } = deletedTechnology;

  const {
    technologies
  } = state;

  delete technologies[id];

  const technologiesIds = Object.keys(technologies).map(id => Number(id))

  const technologiesByTypes = getTechnologiesByTypes(
    technologiesIds,
    technologies,
  )

  return {
    ...state,
    technologies,
    technologiesIds,
    technologiesByTypes,
    technologyDeleting: -1
  }
}

export const allowEditTechnologyHandler = (
  state: ITechnologiesState,
  payload: { id: number }
): ITechnologiesState => {
  return {
    ...state,
    technologyEditing: payload.id
  }
}

export const cancelEditTechnologyHandler = (
  state: ITechnologiesState,
  payload: void
): ITechnologiesState => {
  return {
    ...state,
    technologyEditing: -1
  }
}

export const fetchEditTechnologySuccess = (
  state: ITechnologiesState,
  payload: Success<ITechnology, ITechnology>
): ITechnologiesState => {
  const {
    id
  } = payload.result;

  const technologies = { ...state.technologies };
  const {
    technologiesIds
  } = state
  technologies[id] = payload.result

  const technologiesByTypes = getTechnologiesByTypes(
    technologiesIds,
    technologies
  )

  return {
    ...state,
    technologies,
    technologiesByTypes,
    technologyEditing: -1
  };

}

export const searchTechnologyHandler = (
  state: ITechnologiesState,
  payload: string
): ITechnologiesState => {
  const search = payload;
  const { technologies } = state;
  const allIds = Object.keys(technologies).map(id => Number(id));

  if (!search) {
    const technologiesByTypes = getTechnologiesByTypes(
      allIds,
      technologies,
    )
    return {
      ...state,
      technologiesIds: allIds,
      technologiesByTypes
    }
  }

  const filteredIds = allIds.filter(id => technologies[id].name.toLowerCase().includes(search.toLowerCase()))

  const technologiesByTypes = getTechnologiesByTypes(
    filteredIds,
    technologies,
  )
  return {
    ...state,
    technologiesIds: filteredIds,
    technologiesByTypes
  }
}