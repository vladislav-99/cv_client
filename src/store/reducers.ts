import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import educationsReducer from './educations/reducer';
import experiencesReducer from './experiences/reducer';
import technologiesReducer from './technologies/reducer';
import projectsReducer from './projects/reducer';
import usersReducer from './users/reducer';

const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    experiencesState: experiencesReducer,
    educationsState: educationsReducer,
    technologiesState: technologiesReducer,
    projectsState: projectsReducer,
    usersState: usersReducer,
  });

export default createRootReducer;
