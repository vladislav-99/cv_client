import { all, fork } from '@redux-saga/core/effects'

import educatiunWatchersSaga from './educations/sagas'
import experiencesWatchersSaga from './experiences/sagas'
export default function* rootSaga() {
  yield all([
    fork(educatiunWatchersSaga),
    fork(experiencesWatchersSaga),

  ])
}
