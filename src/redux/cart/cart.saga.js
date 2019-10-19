import { takeLatest, all, put, call } from "redux-saga/effects";
import { CartActionTypes } from "./cart.types";
import UserActionTypes from "../user/user.types";

export function* clearCartOnSignOut() {
  yield put({
    type: CartActionTypes.CLEAR_CART
  });
}
export function* onClearCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onClearCart)]);
}
