import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import educationsReducer from './educations/reducer';
import experiencesReducer from './experiences/reducer';


const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    educationsState: educationsReducer,
    experiencesState: experiencesReducer
  })



export default createRootReducer
