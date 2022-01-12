import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createTechnologies, deleteTechnology, deleteTechnologyAllow, deleteTechnologyCancel, fetchTechnologies } from '../actions';
import { ITechnologiesState } from '../types';
import { deleteHandlerSuccess, fetchHandlerSuccess } from './handlers';

const initialState: ITechnologiesState = {
  technologyDeleting: -1,
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
    deleteTechnologyAllow,
    (state, payload)=> {
      return {
        ...state,
        technologyDeleting: payload.id
      }
    }
  )
  .case(
    deleteTechnologyCancel,
    (state, payload)=> {
      return {
        ...state,
        technologyDeleting: -1
      }
    }
  );
export default technologyReducer;
