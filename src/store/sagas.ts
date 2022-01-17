import { all } from '@redux-saga/core/effects';

import {
  watchEducationsRequest,
  watchAddEducationsRequest,
  watchDeleteEducationRequest,
  watchEditEducationsRequest,
} from './educations/sagas';
import {
  watchExperiencesRequest,
  watchAddExperiencesRequest,
  watchDeleteExperienceRequest,
  watchEditExperienceRequest,
} from './experiences/sagas';

import {
  watchTecnologiesRequest,
  watchAddTecnologiesRequest,
  watchDeleteTechnologyRequest,
  watchEditTechnologyRequest,
} from './technologies/sagas';

export default function* rootSaga() {
  yield all([
    watchEducationsRequest(),
    watchAddEducationsRequest(),
    watchDeleteEducationRequest(),
    watchEditEducationsRequest(),

    watchExperiencesRequest(),
    watchAddExperiencesRequest(),
    watchDeleteExperienceRequest(),
    watchEditExperienceRequest(),

    watchTecnologiesRequest(),
    watchAddTecnologiesRequest(),
    watchDeleteTechnologyRequest(),
    watchEditTechnologyRequest(),
  ]);
}
