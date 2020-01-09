import { call, put, takeLatest, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapsortToMap
} from "../../firebase/firebase.utils";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnapsortToMap, snapShot);
    yield put({
      type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
      payload: collectionMap
    });
  } catch (error) {
    yield put({
      type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
      payload: error.message
    });
  }
}
export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionStart)]);
}
