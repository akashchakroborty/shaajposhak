import { all, call } from "redux-saga/effects";
import { shopSagas } from "../redux/shop/shop.sagas";
import { userSagas } from "../redux/user/user.saga";
import { cartSagas } from "../redux/cart/cart.saga";

export default function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
