import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  API_CALL_REQUEST
} from './types';

import {
  dogFailure,
  dogSuccess
} from './actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(API_CALL_REQUEST, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    // 1st Iteration
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // 2nd Iteration
    // dispatch a success action to the store with the new dog
    yield put(dogSuccess(dog));

  } catch (error) {
    // 3rd Iteration
    // dispatch a failure action to the store with the error
    yield put(dogFailure(error));
  }
}

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random'
  });
}
