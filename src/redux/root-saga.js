import { all, call } from "redux-saga/effects";
import { fetchCollectionStart } from "../redux/shop/shop.sagas";
import { userSagas } from "../redux/user/user.saga";

export default function* rootSaga() {
  yield all([call(fetchCollectionStart), call(userSagas)]);
}
