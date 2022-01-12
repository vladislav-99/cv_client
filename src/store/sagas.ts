import { all } from '@redux-saga/core/effects';

import {
  watchEducationsRequest,
  watchAddEducationsRequest,
  watchDeleteEducationRequest
} from './educations/sagas';
import {
  watchExperiencesRequest,
  watchAddExperiencesRequest,
  watchDeleteExperienceRequest
} from './experiences/sagas';

import {
  watchTecnologiesRequest,
  watchAddTecnologiesRequest,
  watchDeleteTechnologyRequest
} from './technologies/sagas';

export default function* rootSaga() {
  yield all([
    watchEducationsRequest(),
    watchExperiencesRequest(),
    watchTecnologiesRequest(),
    watchAddExperiencesRequest(),
    watchDeleteExperienceRequest(),
    watchAddEducationsRequest(),
    watchDeleteEducationRequest(),
    watchAddTecnologiesRequest(),
    watchDeleteTechnologyRequest()
  ]);
}
