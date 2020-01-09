import { takeLatest, call, put, all } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapShot = yield userRef.get();
    yield put({
      type: UserActionTypes.SIGN_IN_SUCCESS,
      payload: { id: userSnapShot.id, ...userSnapShot.data() }
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: error
    });
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: error
    });
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: error
    });
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put({
      type: UserActionTypes.SIGN_UP_SUCCESS,
      payload: {
        user,
        displayName
      }
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_UP_FAILURE,
      payload: error
    });
  }
}

export function* signInAfterSignUp({ payload: { user, displayName } }) {
  yield call(getSnapshotFromUserAuth, user, { displayName });
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put({
      type: UserActionTypes.SIGN_OUT_SUCCESS
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_OUT_FAILURE,
      payload: error
    });
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put({
      type: UserActionTypes.SIGN_IN_FAILURE,
      payload: error
    });
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckUserSession)
  ]);
}
