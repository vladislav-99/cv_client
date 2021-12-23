import { all } from '@redux-saga/core/effects'

import { watchEducationsRequest } from './educations/sagas'
import { watchExperiencesRequest } from './experiences/sagas'
export default function* rootSaga() {
  yield all([
    watchEducationsRequest(),
    watchExperiencesRequest(),
  ])
}
