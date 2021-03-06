import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createTechnologies, deleteTechnology, deleteTechnologyAllow, deleteTechnologyCancel, editTechnology, editTechnologyCancel, fetchEditTechnology, fetchTechnologies, searchTechnologyFilter } from '../actions';
import { ITechnologiesState } from '../types';
import {
  allowEditTechnologyHandler,
  cancelEditTechnologyHandler,
  deleteHandlerSuccess,
  fetchEditTechnologySuccess,
  fetchHandlerSuccess,
  searchTechnologyHandler
} from './handlers';

const initialState: ITechnologiesState = {
  searchTechnologyName: '',
  technologyDeleting: -1,
  technologyEditing: -1,
  technologyCounts: 0,
  technologiesIds: [],
  technologies: {},
  technologiesByTypes: {}
};

const technologyReducer = reducerWithInitialState(initialState)
  .case(
    fetchTechnologies.done,
    fetchHandlerSuccess
  )
  .case(
    createTechnologies.done,
    fetchHandlerSuccess
  )
  .case(
    deleteTechnology.done,
    deleteHandlerSuccess
  )
  .case(
    fetchEditTechnology.done,
    fetchEditTechnologySuccess
  )
  .case(
    deleteTechnologyAllow,
    (state, payload) => {
      return {
        ...state,
        technologyDeleting: payload.id
      }
    }
  )
  .case(
    deleteTechnologyCancel,
    (state, payload) => {
      return {
        ...state,
        technologyDeleting: -1
      }
    }
  )
  .case(
    editTechnology,
    allowEditTechnologyHandler
  )
  .case(
    editTechnologyCancel,
    cancelEditTechnologyHandler
  )
  .case(
    searchTechnologyFilter,
    searchTechnologyHandler
  );


export default technologyReducer;
